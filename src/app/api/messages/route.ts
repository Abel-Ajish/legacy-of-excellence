import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getMessages, addMessage, updateMessageStatus, deleteMessage } from '@/lib/firebase';
import { sendWebhook } from '@/lib/webhook';

function verifyPassword(password: string): boolean {
  const stored = process.env.ADMIN_PASSWORD || '';
  if (!stored) {
    console.error('[auth] ADMIN_PASSWORD env var not set');
    return false;
  }
  if (!password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(stored);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get('status') || undefined;
    const password = req.nextUrl.searchParams.get('password') || '';

    const requiresAuth = !status || status === 'pending' || status === 'rejected';

    if (requiresAuth) {
      if (!verifyPassword(password)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const messages = await getMessages(status);
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message, role } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    if (name.length > 100) {
      return NextResponse.json({ error: 'Name must be 100 characters or less' }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: 'Message must be 500 characters or less' }, { status: 400 });
    }

    const result = await addMessage(name.trim(), message.trim(), (role || '').trim());
    if (!result) {
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    let webhookFailed = false;
    let webhookError = '';
    try {
      await sendWebhook(result);
    } catch (err) {
      webhookFailed = true;
      webhookError = err instanceof Error ? err.message : 'Unknown error';
      console.error('[messages] Webhook notification failed:', err);
    }

    return NextResponse.json({
      ...result,
      _webhook: webhookFailed ? { sent: false, error: webhookError } : { sent: true },
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, password } = body;

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    if (status !== 'accepted' && status !== 'rejected') {
      return NextResponse.json({ error: 'Status must be accepted or rejected' }, { status: 400 });
    }

    const updated = await updateMessageStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, password } = body;

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const success = await deleteMessage(id);
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

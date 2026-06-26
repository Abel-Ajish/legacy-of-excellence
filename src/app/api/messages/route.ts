import { NextRequest, NextResponse } from 'next/server';
import { getMessages, addMessage, updateMessageStatus } from '@/lib/firebase';

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') || undefined;
  const messages = await getMessages(status);
  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, message, role } = body;

  if (!name || !message) {
    return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
  }

  const result = await addMessage(name, message, role || '');
  if (!result) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }

  return NextResponse.json(result, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, status, password } = body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!id || !status) {
    return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
  }

  const success = await updateMessageStatus(id, status);
  if (!success) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

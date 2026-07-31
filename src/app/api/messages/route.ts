import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/firebase';

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

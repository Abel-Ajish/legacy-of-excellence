import crypto from 'crypto';
import type { Message } from './firebase';

const NTFY_URL = process.env.NTFY_URL || '';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';
const BASE_URL = process.env.BASE_URL || '';

export function generateModerationToken(id: string, action: 'accept' | 'reject'): string {
  const payload = `${id}:${action}:${Math.floor(Date.now() / 1000)}`;
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64url');
}

export function verifyModerationToken(
  id: string,
  action: string,
  token: string
): { valid: boolean; expired?: boolean } {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const parts = decoded.split(':');
    if (parts.length !== 4) return { valid: false };

    const [tokenAction, timestamp, receivedSig] = [parts[1], parts[2], parts[3]];
    const payload = `${id}:${tokenAction}:${timestamp}`;
    const expectedSig = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(receivedSig), Buffer.from(expectedSig))) {
      return { valid: false };
    }

    if (tokenAction !== action) return { valid: false };

    const tokenTime = parseInt(timestamp, 10) * 1000;
    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;
    if (now - tokenTime > TEN_MINUTES) {
      return { valid: true, expired: true };
    }

    return { valid: true };
  } catch {
    return { valid: false };
  }
}

export async function sendWebhook(message: Message): Promise<void> {
  try {
    if (!NTFY_URL || !WEBHOOK_SECRET || !BASE_URL) {
      console.warn('[webhook] Missing NTFY_URL, WEBHOOK_SECRET, or BASE_URL — skipping notification');
      return;
    }

    const acceptToken = generateModerationToken(message.id, 'accept');
    const rejectToken = generateModerationToken(message.id, 'reject');

    const acceptUrl = `${BASE_URL}/api/moderate?id=${encodeURIComponent(message.id)}&action=accept&token=${acceptToken}`;
    const rejectUrl = `${BASE_URL}/api/moderate?id=${encodeURIComponent(message.id)}&action=reject&token=${rejectToken}`;

    const body = [
      `**New Message**`,
      ``,
      `**From:** ${message.name}`,
      message.role ? `**Role:** ${message.role}` : '',
      `**Message:** ${message.message}`,
      ``,
      `[Accept](${acceptUrl})`,
      `[Reject](${rejectUrl})`,
    ]
      .filter(Boolean)
      .join('\n');

    const res = await fetch(NTFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: '0025f0b4bbca4fcb5caa18ea7e3084f5',
        message: body,
        markdown: true,
        tags: ['message', 'inbox_tray'],
      }),
    });

    if (!res.ok) {
      console.error(`[webhook] ntfy.sh returned ${res.status}: ${res.statusText}`);
    }
  } catch (err) {
    console.error('[webhook] Failed to send notification:', err);
  }
}

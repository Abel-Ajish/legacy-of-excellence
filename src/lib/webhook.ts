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

    const receivedBuf = Buffer.from(receivedSig);
    const expectedBuf = Buffer.from(expectedSig);
    if (receivedBuf.length !== expectedBuf.length) {
      return { valid: false };
    }
    if (!crypto.timingSafeEqual(receivedBuf, expectedBuf)) {
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
  if (!NTFY_URL || !WEBHOOK_SECRET || !BASE_URL) {
    const missing = [];
    if (!NTFY_URL) missing.push('NTFY_URL');
    if (!WEBHOOK_SECRET) missing.push('WEBHOOK_SECRET');
    if (!BASE_URL) missing.push('BASE_URL');
    console.error(`[webhook] CRITICAL: Missing env vars: ${missing.join(', ')} — notification will NOT be sent`);
    throw new Error(`Missing webhook config: ${missing.join(', ')}`);
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

  console.log(`[webhook] Sending to ${NTFY_URL.split('/').slice(0, 3).join('/')}...`);

  const res = await fetch(NTFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: body,
      markdown: true,
      tags: ['message', 'inbox_tray'],
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Could not read response');
    console.error(`[webhook] ntfy.sh returned ${res.status}: ${res.statusText} — ${text}`);
    throw new Error(`ntfy.sh returned ${res.status}: ${text}`);
  }

  console.log(`[webhook] Notification sent successfully for message from ${message.name}`);
}

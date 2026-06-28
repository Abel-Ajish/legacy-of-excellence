import { NextRequest, NextResponse } from 'next/server';
import { verifyModerationToken } from '@/lib/webhook';
import { updateMessageStatus } from '@/lib/firebase';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    const action = req.nextUrl.searchParams.get('action');
    const token = req.nextUrl.searchParams.get('token');

    if (!id || !action || !token) {
      return new NextResponse('<h1>Invalid link</h1>', {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (action !== 'accept' && action !== 'reject') {
      return new NextResponse('<h1>Invalid action</h1>', {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const { valid, expired } = verifyModerationToken(id, action, token);

    if (!valid) {
      return new NextResponse('<h1>Invalid or tampered link</h1>', {
        status: 403,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    if (expired) {
      return new NextResponse('<h1>This link has expired (10 min limit)</h1>', {
        status: 410,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const status = action === 'accept' ? 'accepted' : 'rejected';
    const updated = await updateMessageStatus(id, status);

    if (!updated) {
      return new NextResponse('<h1>Failed to update message</h1>', {
        status: 500,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const color = action === 'accept' ? '#16a34a' : '#dc2626';
    const icon = action === 'accept' ? '&#10003;' : '&#10007;';
    const label = action === 'accept' ? 'Accepted' : 'Rejected';

    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message ${label}</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f9fafb; }
    .card { background: white; border-radius: 12px; padding: 2rem; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08); max-width: 400px; }
    .icon { font-size: 3rem; color: ${color}; margin-bottom: 1rem; }
    h1 { color: ${color}; margin: 0 0 0.5rem; }
    p { color: #6b7280; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${label}</h1>
    <p>Message from <strong>${updated.name}</strong> has been ${label.toLowerCase()}.</p>
  </div>
</body>
</html>`,
      { headers: { 'Content-Type': 'text/html' } }
    );
  } catch (err) {
    console.error('[moderate] Error processing moderation request:', err);
    return new NextResponse('<h1>Something went wrong</h1>', {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

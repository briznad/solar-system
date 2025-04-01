import { json } from '@sveltejs/kit';
import { createSessionCookie, verifyAndSetAdminClaims } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return json({ message: 'Missing ID token' }, { status: 400 });
    }

    // Create a session cookie
    const sessionCookie = await createSessionCookie(idToken);

    // Set the session cookie
    cookies.set('__session', sessionCookie, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 5 // 5 days
    });

    // Verify and set admin claims for the new user
    // For the demo, all users are admins
    await verifyAndSetAdminClaims(JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString()).sub);

    return json({ status: 'success' });
  } catch (error) {
    console.error('Signup error:', error);
    return json(
      { message: error instanceof Error ? error.message : 'Authentication failed' },
      { status: 401 }
    );
  }
};

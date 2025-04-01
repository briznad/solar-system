import { json } from '@sveltejs/kit';
import { createSessionCookie } from '$lib/server/auth';
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

    return json({ status: 'success' });
  } catch (error) {
    console.error('Login error:', error);
    return json(
      { message: error instanceof Error ? error.message : 'Authentication failed' },
      { status: 401 }
    );
  }
};

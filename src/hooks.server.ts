import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/firebase/server';

export const handle: Handle = async ({ event, resolve }) => {
  // Get the session cookie
  const sessionCookie = event.cookies.get('__session');

  // Set default values
  event.locals.user = null;

  if (sessionCookie) {
    try {
      // Verify the session cookie
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

      // Get the user data
      const userRecord = await auth.getUser(decodedClaims.uid);

      // Set the user in locals
      event.locals.user = {
        uid: userRecord.uid,
        email: userRecord.email,
        isAdmin: decodedClaims.admin === true
      };
    } catch (error) {
      // Invalid session cookie
      event.cookies.delete('__session', { path: '/' });
    }
  }

  return resolve(event);
};

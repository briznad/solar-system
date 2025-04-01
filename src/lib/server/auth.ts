import { auth } from '$lib/firebase/server';
import { firestore } from '$lib/firebase/server';
import { redirect, error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

// Create a session cookie
export async function createSessionCookie(idToken: string, maxAge: number = 60 * 60 * 24 * 5 * 1000) {
  return auth.createSessionCookie(idToken, { expiresIn: maxAge });
}

// Verify and set user admin status
export async function verifyAndSetAdminClaims(uid: string) {
  try {
    // For demo purposes, all users are admins
    await auth.setCustomUserClaims(uid, { admin: true });

    // Update the user document in Firestore
    const userRef = firestore.collection('users').doc(uid);
    await userRef.update({ isAdmin: true });

    return true;
  } catch (err) {
    console.error('Error setting admin claims:', err);
    return false;
  }
}

// Check if user is authenticated
export function requireAuth(event: RequestEvent) {
  if (!event.locals.user) {
    throw redirect(303, '/login');
  }
  return event.locals.user;
}

// Check if user is an admin
export function requireAdmin(event: RequestEvent) {
  const user = requireAuth(event);

  if (!user.isAdmin) {
    throw error(403, 'Unauthorized. Admin access required.');
  }

  return user;
}

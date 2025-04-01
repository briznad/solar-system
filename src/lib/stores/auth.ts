import { writable, derived } from 'svelte/store';
import type { User } from '$lib/models/user';
import { browser } from '$app/environment';
import { auth as clientAuth } from '$lib/firebase/client';
import { listenToAuthChanges, getCurrentUser } from '$lib/firebase/auth';
import { goto } from '$app/navigation';

// Create initial store states
const userStore = writable<User | null>(null);
const loadingStore = writable<boolean>(true);
const errorStore = writable<string | null>(null);

// Wait for Firebase initialization in browser
if (browser) {
  // Set up Firebase auth state listener
  listenToAuthChanges(async (firebaseUser) => {
    loadingStore.set(true);
    errorStore.set(null);

    try {
      if (firebaseUser) {
        // Get the user data from Firestore
        const userData = await getCurrentUser(firebaseUser);
        userStore.set(userData);
      } else {
        userStore.set(null);
      }
    } catch (err) {
      console.error('Auth store error:', err);
      errorStore.set('Failed to load user data');
      userStore.set(null);
    } finally {
      loadingStore.set(false);
    }
  });
}

// Derived store to check if the user is authenticated
const isAuthenticated = derived(
  [userStore, loadingStore],
  ([$user, $loading]) => !$loading && !!$user
);

// Derived store to check if the user is an admin
const isAdmin = derived(
  userStore,
  ($user) => !!$user?.isAdmin
);

// Helper functions for redirecting based on auth status
export function redirectIfAuthenticated(path = '/planets') {
  return isAuthenticated.subscribe((value) => {
    if (browser && value) {
      goto(path);
    }
  });
}

export function redirectIfNotAuthenticated(path = '/login') {
  return isAuthenticated.subscribe((value) => {
    if (browser && !value && !loadingStore) {
      goto(path);
    }
  });
}

// Export the stores and auth utility functions
export {
  userStore as user,
  loadingStore as loading,
  errorStore as error,
  isAuthenticated,
  isAdmin
};

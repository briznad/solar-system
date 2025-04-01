import { dev } from '$app/environment';

// Only import firebase-admin in server context
let auth: any;
let firestore: any;
let storage: any;

// Dynamically import firebase-admin to avoid issues during build
async function initializeFirebaseAdmin() {
  if (!dev && typeof process === 'undefined') {
    // Skip initialization in production environment that doesn't support Node.js API
    return;
  }

  try {
    const { initializeApp, cert, getApps } = await import('firebase-admin/app');
    const { getAuth } = await import('firebase-admin/auth');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { getStorage } = await import('firebase-admin/storage');
    const { FIREBASE_SERVICE_ACCOUNT } = await import('$env/static/private');

    if (!FIREBASE_SERVICE_ACCOUNT) {
      console.error('FIREBASE_SERVICE_ACCOUNT environment variable not set');

      return;
    }

    try {
      // Parse the service account JSON, ensuring private_key has proper newlines
      const parsedServiceAccount = JSON.parse(FIREBASE_SERVICE_ACCOUNT);

      // Check if private_key is a string and contains escaped newline
      // Replace escaped newlines with actual newlines if needed
      if (parsedServiceAccount.private_key && !parsedServiceAccount.private_key.includes('\n')) {
        parsedServiceAccount.private_key = parsedServiceAccount.private_key
          .replace(/\\n/g, '\n');
      }

      // Initialize Firebase Admin SDK on the server
      if (!getApps().length) {
        initializeApp({
          credential: cert(parsedServiceAccount)
        });
      }
    } catch (error) {
      console.error('Error parsing service account:', error);

      return;
    }

    auth = getAuth();
    firestore = getFirestore();
    storage = getStorage();
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
}

// Initialize Firebase Admin if we're in a server context
if (typeof window === 'undefined') {
  initializeFirebaseAdmin();
}

export { auth, firestore, storage };

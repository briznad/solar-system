import { auth as clientAuth } from './client';
import { firestore as clientFirestore } from './client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import type { UserData, LoginData, User } from '$lib/models/user';

// Register a new user
export async function registerUser(userData: UserData): Promise<User> {
  const { email, password, displayName } = userData;

  // Create the user in Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(clientAuth, email, password);
  const { uid } = userCredential.user;

  // Create the user document in Firestore
  const userDoc = {
    uid,
    email,
    displayName: displayName || null,
    isAdmin: true, // For demo purposes, all users are admins
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(doc(clientFirestore, 'users', uid), userDoc);

  return {
    ...userDoc,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// Login a user
export async function loginUser(loginData: LoginData): Promise<FirebaseUser> {
  const { email, password } = loginData;
  const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);
  return userCredential.user;
}

// Logout a user
export async function logoutUser(): Promise<void> {
  await firebaseSignOut(clientAuth);
}

// Get the current user from Firestore
export async function getCurrentUser(user: FirebaseUser): Promise<User | null> {
  if (!user) return null;

  const userDoc = await getDoc(doc(clientFirestore, 'users', user.uid));

  if (!userDoc.exists()) return null;

  const userData = userDoc.data() as Omit<User, 'createdAt' | 'updatedAt'> & {
    createdAt: { toDate: () => Date };
    updatedAt: { toDate: () => Date };
  };

  return {
    ...userData,
    createdAt: userData.createdAt.toDate(),
    updatedAt: userData.updatedAt.toDate()
  };
}

// Listen to auth state changes
export function listenToAuthChanges(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(clientAuth, callback);
}

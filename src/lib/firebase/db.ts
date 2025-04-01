import { firestore as clientFirestore } from './client';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import type { Planet, PlanetData } from '$lib/models/planet';

// Collection references
const planetsCollection = collection(clientFirestore, 'planets');

// Add a new planet
export async function addPlanet(planetData: PlanetData, userId: string): Promise<string> {
  const docRef = await addDoc(planetsCollection, {
    ...planetData,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return docRef.id;
}

// Get all planets
export async function getAllPlanets(): Promise<Planet[]> {
  const q = query(planetsCollection, orderBy('name'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data() as Omit<Planet, 'id' | 'createdAt' | 'updatedAt'> & {
      createdAt: { toDate: () => Date };
      updatedAt: { toDate: () => Date };
    };

    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  });
}

// Get a single planet by ID
export async function getPlanetById(id: string): Promise<Planet | null> {
  const docRef = doc(clientFirestore, 'planets', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data() as Omit<Planet, 'id' | 'createdAt' | 'updatedAt'> & {
    createdAt: { toDate: () => Date };
    updatedAt: { toDate: () => Date };
  };

  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate()
  };
}

// Update a planet
export async function updatePlanet(id: string, planetData: Partial<PlanetData>): Promise<void> {
  const docRef = doc(clientFirestore, 'planets', id);
  await updateDoc(docRef, {
    ...planetData,
    updatedAt: serverTimestamp()
  });
}

// Delete a planet
export async function deletePlanet(id: string): Promise<void> {
  const docRef = doc(clientFirestore, 'planets', id);
  await deleteDoc(docRef);
}

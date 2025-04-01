import type { PageServerLoad } from './$types';
import { firestore } from '$lib/firebase/server';

export const load: PageServerLoad = async ({ locals }) => {
  // Get all planets from Firestore
  const planetsSnapshot = await firestore.collection('planets').orderBy('name').get();

  const planets = planetsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      diameter: data.diameter,
      distanceFromSun: data.distanceFromSun,
      hasRings: data.hasRings,
      moons: data.moons,
      imageUrl: data.imageUrl,
      createdBy: data.createdBy,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  });

  return { planets };
};

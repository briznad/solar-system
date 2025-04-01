import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { firestore } from '$lib/firebase/server';

export const load: PageServerLoad = async ({ params, locals }) => {
  // Check if user is admin
  if (!locals.user?.isAdmin) {
    throw redirect(302, '/planets');
  }

  const { id } = params;

  // Get the planet from Firestore
  const planetDoc = await firestore.collection('planets').doc(id).get();

  if (!planetDoc.exists) {
    throw error(404, 'Planet not found');
  }

  const data = planetDoc.data();

  if (!data) {
    throw error(500, 'Failed to load planet data');
  }

  return {
    planet: {
      id: planetDoc.id,
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
    }
  };
};

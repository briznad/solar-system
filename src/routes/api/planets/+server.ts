import { json } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth';
import { firestore } from '$lib/firebase/server';
import type { RequestHandler } from './$types';

// GET /api/planets
export const GET: RequestHandler = async ({ locals }) => {
  try {
    // Get all planets from Firestore
    const planetsSnapshot = await firestore.collection('planets').orderBy('name').get();

    const planets = planetsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString()
      };
    });

    return json(planets);
  } catch (error) {
    console.error('Error fetching planets:', error);
    return json(
      { message: error instanceof Error ? error.message : 'Failed to fetch planets' },
      { status: 500 }
    );
  }
};

// POST /api/planets
export const POST: RequestHandler = async ({ request, locals }) => {
  // Only admins can create planets
  const user = requireAdmin({ locals, request, url: new URL(request.url) });

  try {
    const planetData = await request.json();

    // Add the planet to Firestore
    const docRef = await firestore.collection('planets').add({
      ...planetData,
      createdBy: user.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return json({ id: docRef.id, status: 'success' });
  } catch (error) {
    console.error('Error creating planet:', error);
    return json(
      { message: error instanceof Error ? error.message : 'Failed to create planet' },
      { status: 500 }
    );
  }
};

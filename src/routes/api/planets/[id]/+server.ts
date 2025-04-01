import { json } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth';
import { firestore } from '$lib/firebase/server';
import type { RequestHandler } from './$types';

// GET /api/planets/:id
export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;

    // Get the planet from Firestore
    const planetDoc = await firestore.collection('planets').doc(id).get();

    if (!planetDoc.exists) {
      return json({ message: 'Planet not found' }, { status: 404 });
    }

    const data = planetDoc.data();

    return json({
      id: planetDoc.id,
      ...data,
      createdAt: data?.createdAt.toDate().toISOString(),
      updatedAt: data?.updatedAt.toDate().toISOString()
    });
  } catch (error) {
    console.error('Error fetching planet:', error);
    return json(
      { message: error instanceof Error ? error.message : 'Failed to fetch planet' },
      { status: 500 }
    );
  }
};

// PUT /api/planets/:id
export const PUT: RequestHandler = async ({ params, request, locals }) => {
  // Only admins can update planets
  requireAdmin({ locals, request, url: new URL(request.url) });

  try {
    const { id } = params;
    const planetData = await request.json();

    // Update the planet in Firestore
    await firestore.collection('planets').doc(id).update({
      ...planetData,
      updatedAt: new Date()
    });

    return json({ status: 'success' });
  } catch (error) {
    console.error('Error updating planet:', error);
    return json(
      { message: error instanceof Error ? error.message : 'Failed to update planet' },
      { status: 500 }
    );
  }
};

// DELETE /api/planets/:id
export const DELETE: RequestHandler = async ({ params, request, locals }) => {
  // Only admins can delete planets
  requireAdmin({ locals, request, url: new URL(request.url) });

  try {
    const { id } = params;

    // Delete the planet from Firestore
    await firestore.collection('planets').doc(id).delete();

    return json({ status: 'success' });
  } catch (error) {
    console.error('Error deleting planet:', error);
    return json(
      { message: error instanceof Error ? error.message : 'Failed to delete planet' },
      { status: 500 }
    );
  }
};

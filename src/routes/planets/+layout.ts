import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent, fetch }) => {
  const { user } = await parent();

  // Redirect to login if not authenticated
  if (!user) {
    throw redirect(302, '/login');
  }

  return { user };
};

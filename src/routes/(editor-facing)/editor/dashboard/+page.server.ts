import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';
import type { User } from '$lib/server/auth';

export const load: PageServerLoad = (event) => {
	if (!event.locals.user) {
		return redirect(302, resolve('/editor/login'));
	}
	return { user: event.locals.user as User };
};

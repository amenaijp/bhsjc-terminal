import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = (event) => {
	if (!event.locals.user) {
		return redirect(302, resolve('/editor/login'));
	}
	// This route is only for unverified users; if they have an account and are verified or admin send them to the dashboard
	if (event.locals.user.userType != 'unverified') {
		return redirect(302, resolve('/editor/dashboard'));
	}
};

export const actions: Actions = {
	signOut: async ({ request }) => {
		await auth.api.signOut({
			headers: request.headers
		});
		return redirect(302, resolve('/editor/login'));
	}
};

import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { resolve } from '$app/paths';
import type { User as BetterAuthUser } from '$lib/server/auth';

export const load: LayoutServerLoad = (event) => {
	if (!event.locals.user) {
		return redirect(302, resolve('/editor/login'));
	}
	let user = event.locals.user as BetterAuthUser;
	// in order to access trusted routes, the user needs to either be 'editor' or 'admin'. there are a couple of routes
	// where the user must be an admin but those have per-route handlers
	if (user.userType == 'unverified') {
		return redirect(302, resolve('/editor/not-verified'));
	}

	return { user };
};

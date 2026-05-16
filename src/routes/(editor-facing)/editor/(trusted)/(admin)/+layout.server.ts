import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { resolve } from '$app/paths';

export const load: LayoutServerLoad = (event) => {
	if (!event.locals.user) {
		return redirect(302, resolve('/editor/login'));
	}
	// There are admin routes
	if (event.locals.user.userType != 'admin') {
		return redirect(302, resolve('/editor/dashboard')); // Send back to dashboard
	}
};

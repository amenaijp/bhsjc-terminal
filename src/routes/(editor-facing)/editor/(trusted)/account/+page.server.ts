import { fail, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	signOut: async ({ request }) => {
		await auth.api.signOut({
			headers: request.headers
		});
		return redirect(302, resolve('/editor/login'));
	},
	changeName: async ({ request, locals }) => {
		if (!locals.user) return fail(403);

		const form = await request.formData();
		const name = form.get('name') as string;

		if (!name) return fail(400, { error: 'Missing name' });

		await db.update(user).set({ name: name }).where(eq(user.id, locals.user.id));
	}
};

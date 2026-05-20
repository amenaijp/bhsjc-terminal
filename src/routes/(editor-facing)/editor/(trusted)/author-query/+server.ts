import { json, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { like, and, not, eq } from 'drizzle-orm';
import { resolve } from '$app/paths';

export const GET = async ({ url, locals }) => {
	if (!locals.user) {
		// random internet people shouldn't be able to see our editors' names
		return redirect(302, resolve('/editor/login'));
	}

	const query = url.searchParams.get('q');
	if (!query) return json([]);

	const results = await db
		.select({ id: user.id, name: user.name })
		.from(user)
		.where(
			and(
				like(user.name, `%${query}%`),
				not(eq(user.userType, 'unverified')),
				not(eq(user.id, locals.user.id))
			)
		)
		.limit(5);

	return json(results);
};

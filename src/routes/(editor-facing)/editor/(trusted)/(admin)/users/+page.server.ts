import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';
import { desc, asc, eq } from 'drizzle-orm';
import { session, account, verification, user } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user?.userType != 'admin') {
		return redirect(302, resolve('/editor/dashboard'));
	}

	const onlyUnverified = event.url.searchParams.get('unverified') === 'true';

	return {
		users: await db
			.select()
			.from(user)
			.where(onlyUnverified ? eq(user.userType, 'unverified') : undefined)
			.orderBy(desc(user.userType), asc(user.name)),
		onlyUnverified
	};
};

export const actions: Actions = {
	promote: async ({ request, locals }) => {
		if (locals.user?.userType !== 'admin') return fail(403);

		const form = await request.formData();
		const id = form.get('id') as string;
		const to = form.get('to') as string;

		if (!id) return fail(400, { error: 'Missing id' });
		if (!['editor', 'admin'].includes(to)) return fail(400, { error: 'Invalid userType' });

		await db
			.update(user)
			.set({ userType: to as 'editor' | 'admin' })
			.where(eq(user.id, id));
	},

	delete: async ({ request, locals }) => {
		if (locals.user?.userType !== 'admin') return fail(403);

		const form = await request.formData();
		const id = form.get('id') as string;

		if (!id) return fail(400, { error: 'Missing id' });

		// extra safety: never allow deleting editors or admins
		const target = db.select().from(user).where(eq(user.id, id)).get();
		if (!target) return fail(404, { error: 'User not found' });
		if (target.userType !== 'unverified')
			return fail(403, { error: 'Can only delete unverified users' });

		// betterauth's deleteUser is intended for users deleting their own accounts. The best solution here would be to
		// rework the db schema, betterauth custom types, and all routes to remove the userType field and instead base
		// access on a user's emailVerified and role == "admin" properties, using betterauth's admin plugin. For now,
		// though, we just work directly on the database. FIXME: above
		await db.delete(session).where(eq(session.userId, id));
		await db.delete(account).where(eq(account.userId, id));
		await db.delete(verification).where(eq(verification.identifier, id));
		await db.delete(user).where(eq(user.id, id));
	}
};

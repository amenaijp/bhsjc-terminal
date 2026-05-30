import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { resolve } from '$app/paths';
import { and, like, eq } from 'drizzle-orm';
import { adCampaign } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import type { Actions } from './$types';
import { nanoid } from 'nanoid';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user?.userType != 'admin') {
		return redirect(302, resolve('/editor/dashboard'));
	}

	const search = (event.url.searchParams.get('search') as string) ?? '';
	const activeOnly = event.url.searchParams.get('activeOnly') === 'true';

	return {
		ads: await db
			.select()
			.from(adCampaign)
			.where(
				and(
					search ? like(adCampaign.name, `%${search}%`) : undefined,
					activeOnly ? eq(adCampaign.active, true) : undefined
				)
			),
		search,
		activeOnly
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (locals.user?.userType !== 'admin') return fail(403);

		// find a unique id
		let id = '';
		while (1) {
			id = nanoid(10);
			const collision = db.select().from(adCampaign).where(eq(adCampaign.id, id)).get();
			if (!collision) break;
		}

		const form = await request.formData();

		await db.insert(adCampaign).values({
			id,
			name: form.get('name') as string,
			image: form.get('image') as string,
			link: form.get('link') as string,
			active: (form.get('active') as string) == 'on'
		});
		await db.update(adCampaign).set({ views: 0 });
	},
	toggleActive: async ({ request, locals }) => {
		if (locals.user?.userType !== 'admin') return fail(403);

		const form = await request.formData();
		const id = form.get('id') as string;
		const setTo = form.get('setTo') === 'true';

		await db.update(adCampaign).set({ active: setTo }).where(eq(adCampaign.id, id));
		await db.update(adCampaign).set({ views: 0 });
	},
	delete: async ({ request, locals }) => {
		if (locals.user?.userType !== 'admin') return fail(403);

		const form = await request.formData();
		const id = form.get('id') as string;

		await db.delete(adCampaign).where(eq(adCampaign.id, id));
		await db.update(adCampaign).set({ views: 0 });
	}
};

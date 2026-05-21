import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { layoutSlot } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { Genre } from '$lib/genres';

export const POST = async ({ request, locals }) => {
	if (locals.user?.userType !== 'admin') {
		return json({ message: 'Unauthorized' }, { status: 403 });
	}

	const form = await request.formData();
	const page = form.get('page') as 'front' | Genre;
	const slotType = form.get('slotType') as string;
	const position = parseInt(form.get('position') as string);
	const articleId = (form.get('articleId') as string) || null;

	await db
		.update(layoutSlot)
		.set({ articleId })
		.where(
			and(
				eq(layoutSlot.page, page),
				eq(layoutSlot.slotType, slotType as typeof layoutSlot.$inferSelect.slotType),
				eq(layoutSlot.position, position)
			)
		);

	return json({ success: true });
};

import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { article, layoutSlot } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { resolve } from '$app/paths';

export async function load({ locals }) {
	if (locals.user?.userType != 'admin') {
		return redirect(302, resolve('/editor/dashboard'));
	}

	const layout = await db
		.select({
			page: layoutSlot.page,
			slotType: layoutSlot.slotType,
			position: layoutSlot.position,
			articleId: layoutSlot.articleId,
			articleTitle: article.title
		})
		.from(layoutSlot)
		.leftJoin(article, eq(layoutSlot.articleId, article.id));

	return {
		layout
	};
}

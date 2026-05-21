import { redirect } from '@sveltejs/kit';
import { eq, inArray } from 'drizzle-orm';
import { article, articleAuthor, layoutSlot, user } from '$lib/server/db/schema';
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

	const articleIds = layout.map((s) => s.articleId).filter((id) => id !== null) as string[];

	const authors =
		articleIds.length > 0
			? await db
					.select({ articleId: articleAuthor.articleId, name: user.name })
					.from(articleAuthor)
					.innerJoin(user, eq(articleAuthor.editorId, user.id))
					.where(inArray(articleAuthor.articleId, articleIds))
			: [];

	const authorsByArticleId = articleIds.reduce<Record<string, string[]>>((acc, id) => {
		acc[id] = authors.filter((a) => a.articleId === id).map((a) => a.name);
		return acc;
	}, {});

	return {
		layout: layout.map((slot) => ({
			page: slot.page,
			slotType: slot.slotType,
			position: slot.position,
			articleId: slot.articleId,
			articleTitle: slot.articleTitle,
			authors: slot.articleId ? (authorsByArticleId[slot.articleId] ?? []) : []
		}))
	};
}

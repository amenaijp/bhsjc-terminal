import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { desc, eq } from 'drizzle-orm';
import { article, articleAuthor } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { nanoid } from 'nanoid';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return error(403);

	const search = event.url.searchParams.get('search') as string;

	const articles = await db
		.select()
		.from(article)
		.where(eq(article.ownerId, event.locals.user.id))
		.orderBy(desc(article.createdAt));

	return {
		articles,
		search
	};
};

export const actions: Actions = {
	newArticle: async ({ locals }) => {
		if (!locals.user) return fail(403);

		// find a unique id
		let id = '';
		while (1) {
			id = nanoid(10);
			const collision = db.select().from(article).where(eq(article.id, id)).get();
			if (!collision) break;
		}

		const defaultArticle: typeof article.$inferInsert = {
			id,
			userWrittenHook: 'example article hook',
			hook: 'example article hook',
			fullText: 'example article text',
			frontImage: '',
			title: 'untitled article',
			ownerId: locals.user.id
		};

		const author_entry: typeof articleAuthor.$inferInsert = {
			articleId: id,
			editorId: locals.user.id
		};

		await db.insert(article).values(defaultArticle);
		await db.insert(articleAuthor).values(author_entry);

		return redirect(302, resolve(`/editor/articles/${id}`));
	}
};

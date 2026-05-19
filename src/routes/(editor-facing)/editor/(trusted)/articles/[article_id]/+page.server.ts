import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { article, articleGenre } from '$lib/server/db/schema';
import { and, eq, inArray } from 'drizzle-orm';
import type { Actions } from './$types';
import type { Genre } from '$lib/genres';

export async function load({ params, locals }) {
	if (!locals.user) return error(403);
	const { article_id } = params;
	const article_data = db.select().from(article).where(eq(article.id, article_id)).get();
	if (!article_data) return error(404); // if there is no article with that id
	if (article_data.ownerId != locals.user.id) return error(403); // if the accessing user is not the article's owner

	const article_genres = await db
		.select()
		.from(articleGenre)
		.where(eq(articleGenre.articleId, article_id));
	const genres = article_genres.map((g) => g.genre);

	return { article_data, genres };
}

export const actions: Actions = {
	save: async ({ request, params }) => {
		const form = await request.formData();

		// handle genres
		const genres = JSON.parse(form.get('genres') as string) as Genre[];
		const existing = await db
			.select()
			.from(articleGenre)
			.where(eq(articleGenre.articleId, params.article_id));
		const existingGenres = existing.map((g) => g.genre);
		const toAdd = genres.filter((g) => !existingGenres.includes(g));
		const toRemove = existingGenres.filter((g) => !genres.includes(g));
		if (toAdd.length > 0) {
			// drizzle is likely to throw given an empty array
			await db
				.insert(articleGenre)
				.values(toAdd.map((genre) => ({ articleId: params.article_id, genre })));
		}
		if (toRemove.length > 0) {
			await db
				.delete(articleGenre)
				.where(
					and(eq(articleGenre.articleId, params.article_id), inArray(articleGenre.genre, toRemove))
				);
		}

		await db
			.update(article)
			.set({
				title: (form.get('title') as string) ?? '',
				fullText: (form.get('fullText') as string) ?? '',
				userWrittenHook: (form.get('userWrittenHook') as string) ?? '',
				hook: (form.get('hook') as string) ?? '',
				openToFeedback: form.get('openToFeedback') === 'true',
				published: form.get('published') === 'true',
				frontImage: (form.get('frontImage') as string) ?? ''
			})
			.where(eq(article.id, params.article_id));
		return { success: true };
	}
};

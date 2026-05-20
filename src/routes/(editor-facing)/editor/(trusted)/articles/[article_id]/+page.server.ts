import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { article, articleAuthor, articleGenre, user } from '$lib/server/db/schema';
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

	const article_authors = await db
		.select({ id: user.id, name: user.name })
		.from(articleAuthor)
		.innerJoin(user, eq(articleAuthor.editorId, user.id))
		.where(eq(articleAuthor.articleId, article_id));

	return { article_data, genres, article_authors };
}

export const actions: Actions = {
	save: async ({ request, params, locals }) => {
		if (!locals.user) return error(403);

		const form = await request.formData();

		// handle genres
		const genres = JSON.parse(form.get('genres') as string) as Genre[];
		const existing_genre = await db
			.select()
			.from(articleGenre)
			.where(eq(articleGenre.articleId, params.article_id));
		const existingGenres = existing_genre.map((g) => g.genre);
		const toAddGenres = genres.filter((g) => !existingGenres.includes(g));
		const toRemoveGenres = existingGenres.filter((g) => !genres.includes(g));
		if (toAddGenres.length > 0) {
			// drizzle is likely to throw given an empty array
			await db
				.insert(articleGenre)
				.values(toAddGenres.map((genre) => ({ articleId: params.article_id, genre })));
		}
		if (toRemoveGenres.length > 0) {
			await db
				.delete(articleGenre)
				.where(
					and(
						eq(articleGenre.articleId, params.article_id),
						inArray(articleGenre.genre, toRemoveGenres)
					)
				);
		}

		// handle coauthors
		const coauthorIds = JSON.parse(form.get('coauthors') as string) as string[];

		// ensure current user is always included
		if (!coauthorIds.includes(locals.user.id)) {
			coauthorIds.push(locals.user.id);
		}

		const existingAuthors = await db
			.select()
			.from(articleAuthor)
			.where(eq(articleAuthor.articleId, params.article_id));
		const existingIds = existingAuthors.map((a) => a.editorId);

		const ToAddAuthors = coauthorIds.filter((id) => !existingIds.includes(id));
		const toRemoveAuthors = existingIds.filter((id) => !coauthorIds.includes(id));

		if (ToAddAuthors.length > 0) {
			await db
				.insert(articleAuthor)
				.values(ToAddAuthors.map((editorId) => ({ articleId: params.article_id, editorId })));
		}
		if (toRemoveAuthors.length > 0) {
			await db
				.delete(articleAuthor)
				.where(
					and(
						eq(articleAuthor.articleId, params.article_id),
						inArray(articleAuthor.editorId, toRemoveAuthors)
					)
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

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { desc, eq, like, and, inArray } from 'drizzle-orm';
import { article, articleAuthor, articleGenre, user } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return error(403);

	const search = event.url.searchParams.get('search') as string;

	const articles = await db
		.select()
		.from(article)
		.where(
			and(eq(article.openToFeedback, true), search ? like(article.title, `%${search}%`) : undefined)
		)
		.orderBy(desc(article.updatedAt));

	const articleIds = articles.map((a) => a.id);

	if (articleIds.length === 0)
		return {
			articles: [],
			search
		};

	const [authors, genres] = await Promise.all([
		db
			.select({ articleId: articleAuthor.articleId, name: user.name })
			.from(articleAuthor)
			.innerJoin(user, eq(articleAuthor.editorId, user.id))
			.where(inArray(articleAuthor.articleId, articleIds)),
		db
			.select({ articleId: articleGenre.articleId, genre: articleGenre.genre })
			.from(articleGenre)
			.where(inArray(articleGenre.articleId, articleIds))
	]);

	return {
		articles: articles.map((a) => ({
			...a,
			authors: authors.filter((r) => r.articleId === a.id).map((r) => r.name),
			genres: genres.filter((r) => r.articleId === a.id).map((r) => r.genre)
		})),
		search
	};
};

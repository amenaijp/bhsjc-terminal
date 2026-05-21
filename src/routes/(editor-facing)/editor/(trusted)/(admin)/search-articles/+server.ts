import { json, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { article, articleAuthor, articleGenre, user } from '$lib/server/db/schema';
import { like, eq, inArray, and } from 'drizzle-orm';
import { resolve } from '$app/paths';
import type { Genre } from '$lib/genres';

// FIXME: this api point, and honestly, all of the others, should be under a seperate editor/api and editor/api/admin route
// FIXME: check the general queries and reason if they're the best way to go about the intended result

export const GET = async ({ url, locals }) => {
	if (!locals.user) return redirect(302, resolve('/editor/login'));
	if (locals.user.userType != 'admin') return redirect(302, resolve('/editor/dashboard'));

	const q = url.searchParams.get('q');
	if (!q) return json([]);

	const page = url.searchParams.get('page') as Genre | null; // null means front page, accept any genre

	// some of the wost spaghetti code i've had the misfortune of having to write
	const articles = page
		? await db
				.selectDistinct({ id: article.id, title: article.title })
				.from(article)
				.innerJoin(articleGenre, eq(articleGenre.articleId, article.id))
				.where(
					and(
						like(article.title, `%${q}%`),
						eq(articleGenre.genre, page),
						eq(article.published, true)
					)
				)
				.limit(5)
		: await db
				.select({ id: article.id, title: article.title })
				.from(article)
				.where(and(like(article.title, `%${q}%`), eq(article.published, true)))
				.limit(5);

	const ids = articles.map((a) => a.id);
	const authors =
		ids.length > 0
			? await db
					.select({ articleId: articleAuthor.articleId, name: user.name })
					.from(articleAuthor)
					.innerJoin(user, eq(articleAuthor.editorId, user.id))
					.where(inArray(articleAuthor.articleId, ids))
			: [];

	return json(
		articles.map((a) => ({
			id: a.id,
			title: a.title,
			authors: authors.filter((au) => au.articleId === a.id).map((au) => au.name)
		}))
	);
};

import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { article, articleAuthor, articleGenre, user } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

export async function load({ params, locals }) {
	const { article_id } = params;

	const viewing_article = db.select().from(article).where(eq(article.id, article_id)).get();
	if (!viewing_article || !viewing_article.published) return error(404);

	const authors = await db
		.select({ name: user.name })
		.from(articleAuthor)
		.innerJoin(user, eq(articleAuthor.editorId, user.id))
		.where(eq(articleAuthor.articleId, article_id));

	const genres = await db
		.select({ genre: articleGenre.genre })
		.from(articleGenre)
		.where(eq(articleGenre.articleId, article_id));

	return {
		article: viewing_article,
		authors,
		genres
	};
}

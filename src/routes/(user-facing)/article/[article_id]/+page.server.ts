import { error } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { adCampaign, article, articleAuthor, articleGenre, user } from '$lib/server/db/schema';
import { db } from '$lib/server/db';

// this is _very_ similar to the loader for OTF article viewing, maybe move to a $lib thing?

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

	// ad stuff
	const paragraphs = viewing_article.fullText.split('\n\n');

	const ad =
		paragraphs.length > 5
			? db
					.select()
					.from(adCampaign)
					.where(eq(adCampaign.active, true))
					.orderBy(asc(adCampaign.views))
					.get()
			: undefined;

	if (ad) {
		await db
			.update(adCampaign)
			.set({ views: ad.views + 1 })
			.where(eq(adCampaign.id, ad.id));
	}

	return {
		article: viewing_article,
		authors,
		genres,
		ad
	};
}

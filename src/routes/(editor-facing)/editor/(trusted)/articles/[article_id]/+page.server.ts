import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { article } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export async function load({ params, locals }) {
	if (!locals.user) return error(403);
	const { article_id } = params;
	const article_data = db.select().from(article).where(eq(article.id, article_id)).get();
	if (!article_data) return error(404); // if there is no article with that id
	if (article_data.ownerId != locals.user.id) return error(403); // if the accessing user is not the article's owner

	return { article_data };
}

export const actions: Actions = {
	save: async ({ request, params }) => {
		const form = await request.formData();
		// await db.updateItem(params.id, {
		// 	title: form.get('title'),
		// 	body: form.get('body')
		// 	// ...
		// });
		await db
			.update(article)
			.set({
				title: (form.get('title') as string) ?? '',
				fullText: (form.get('fullText') as string) ?? '',
				userWrittenHook: (form.get('userWrittenHook') as string) ?? '',
				hook: (form.get('hook') as string) ?? ''
			})
			.where(eq(article.id, params.article_id));
		return { success: true };
	}
};

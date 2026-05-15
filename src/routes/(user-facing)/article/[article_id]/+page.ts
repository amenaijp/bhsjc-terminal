// src/routes/genre/[genre=genre]/+page.ts
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { article_id } = params;

	return { article_id };
}

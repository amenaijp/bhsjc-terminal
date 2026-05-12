// src/routes/genre/[genre]/+page.ts
import { error } from '@sveltejs/kit';
import { GENRES, type Genre } from '$lib/genres';

export async function load({ params }) {
	const { genre } = params;

	if (!GENRES.includes(genre as Genre)) {
		throw error(404, `Genre "${params.genre}" not found`);
	}

	return { genre };
}

import { error } from '@sveltejs/kit';
import { GENRES, type Genre } from '$lib/genres';

export async function load({ params }) {
	const { genre } = params;

	if (!GENRES.includes(genre as Genre)) {
		throw error(404, `Genre "${genre}" not found`);
	}

	return { genre: genre as Genre };
}

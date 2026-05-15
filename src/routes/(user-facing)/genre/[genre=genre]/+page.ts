import type { Genre } from '$lib/genres';

export async function load({ params }) {
	return { genre: params.genre as Genre };
}

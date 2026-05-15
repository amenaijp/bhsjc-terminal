import { GENRES, type Genre } from '$lib/genres';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param): param is Genre => {
	return GENRES.includes(param as Genre);
}) satisfies ParamMatcher;

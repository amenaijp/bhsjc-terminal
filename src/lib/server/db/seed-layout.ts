import { GENRES } from '$lib/genres';
import { layoutSlot } from '$lib/server/db/schema';
import { db } from '$lib/server/db/index';

export async function seedLayout() {
	const slots = [
		{ page: 'front', slotType: 'main', position: 0, articleId: null },
		{ page: 'front', slotType: 'side', position: 0, articleId: null },
		{ page: 'front', slotType: 'side', position: 1, articleId: null },
		{ page: 'front', slotType: 'side', position: 2, articleId: null },
		{ page: 'front', slotType: 'very_side', position: 0, articleId: null },
		...GENRES.flatMap((genre) => [
			{ page: genre, slotType: 'main' as const, position: 0, articleId: null },
			...[0, 1, 2, 3, 4, 5].map((position) => ({
				page: genre,
				slotType: 'side' as const,
				position,
				articleId: null
			}))
		])
	] satisfies (typeof layoutSlot.$inferInsert)[];

	await db.insert(layoutSlot).values(slots).onConflictDoNothing();
}

import { db } from '$lib/server/db';
import {
	article,
	articleGenre,
	layoutSlot,
	type MainArticleScaffold,
	type SideArticleScaffold
} from '$lib/server/db/schema';
import { and, desc, eq, inArray, notInArray } from 'drizzle-orm';
import type { Genre } from '$lib/genres';

export async function load({ params }) {
	const genre = params.genre as Genre;

	const slots = await db.select().from(layoutSlot).where(eq(layoutSlot.page, genre));

	const pinnedIds = slots.map((s) => s.articleId).filter(Boolean) as string[];
	const autoCount = slots.filter((s) => !s.articleId).length;

	const select = {
		id: article.id,
		title: article.title,
		hook: article.hook,
		frontImage: article.frontImage
	};

	// articles must belong to the target genre
	const inGenre = eq(articleGenre.genre, genre);

	const [pinned, autoRaw] = await Promise.all([
		pinnedIds.length > 0
			? db
					.select(select)
					.from(article)
					.innerJoin(articleGenre, eq(articleGenre.articleId, article.id))
					.where(and(inArray(article.id, pinnedIds), inGenre))
			: [],
		autoCount > 0
			? db
					.select(select)
					.from(article)
					.innerJoin(articleGenre, eq(articleGenre.articleId, article.id))
					.where(
						and(
							eq(article.published, true),
							inGenre,
							pinnedIds.length > 0 ? notInArray(article.id, pinnedIds) : undefined
						)
					)
					.orderBy(desc(article.updatedAt))
					.limit(autoCount + 10)
			: []
	]);

	const pinnedMap = new Map(pinned.map((a) => [a.id, a]));

	const mainSlot = slots.find((s) => s.slotType === 'main')!;
	let auto = [...autoRaw];
	if (!mainSlot.articleId) {
		const mainCandidateIndex = auto.findIndex((a) => a.frontImage);
		if (mainCandidateIndex > 0) {
			const [candidate] = auto.splice(mainCandidateIndex, 1);
			auto = [candidate, ...auto];
		}
	}
	auto = auto.slice(0, autoCount);

	let autoIndex = 0;
	function resolve(slot: (typeof slots)[number]) {
		return slot.articleId ? (pinnedMap.get(slot.articleId) ?? null) : (auto[autoIndex++] ?? null);
	}

	const main = resolve(mainSlot);
	const sides = slots
		.filter((s) => s.slotType === 'side')
		.sort((a, b) => a.position - b.position)
		.map(resolve);

	return {
		genre,
		main:
			main &&
			({
				id: main.id,
				title: main.title,
				hook: main.hook,
				frontImage: main.frontImage
			} as MainArticleScaffold),
		sides: sides.map(
			(a) => a && { id: a.id, title: a.title, hook: a.hook }
		) as SideArticleScaffold[]
	};
}

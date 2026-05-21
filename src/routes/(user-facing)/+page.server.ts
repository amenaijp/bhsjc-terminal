import { db } from '$lib/server/db';
import {
	article,
	layoutSlot,
	type MainArticleScaffold,
	type SideArticleScaffold,
	type VerySideArticleScaffold
} from '$lib/server/db/schema';
import { and, desc, eq, inArray, notInArray } from 'drizzle-orm';

// FIXME: again, there _has_ to be a better way to do this

export async function load() {
	const slots = await db.select().from(layoutSlot).where(eq(layoutSlot.page, 'front'));

	const pinnedIds = slots.map((s) => s.articleId).filter(Boolean) as string[];
	const autoCount = slots.filter((s) => !s.articleId).length;

	const select = {
		id: article.id,
		title: article.title,
		hook: article.hook,
		frontImage: article.frontImage
	};

	const [pinned, autoRaw] = await Promise.all([
		pinnedIds.length > 0
			? db.select(select).from(article).where(inArray(article.id, pinnedIds))
			: [],
		autoCount > 0
			? db
					.select(select)
					.from(article)
					.where(
						and(
							eq(article.published, true),
							pinnedIds.length > 0 ? notInArray(article.id, pinnedIds) : undefined
						)
					)
					.orderBy(desc(article.updatedAt))
					// fetch extra in case we need to skip imageless articles for main
					.limit(autoCount + 10)
			: []
	]);

	const pinnedMap = new Map(pinned.map((a) => [a.id, a]));

	// build auto pool, but if main slot is auto, ensure the first article has a frontImage
	const mainSlot = slots.find((s) => s.slotType === 'main')!;
	let auto = [...autoRaw];
	if (!mainSlot.articleId) {
		const mainCandidateIndex = auto.findIndex((a) => a.frontImage);
		if (mainCandidateIndex > 0) {
			// move the first image-having article to the front, preserve order of the rest
			const [candidate] = auto.splice(mainCandidateIndex, 1);
			auto = [candidate, ...auto];
		}
	}
	// trim back to autoCount now that we've reordered
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
	const verySide = resolve(slots.find((s) => s.slotType === 'very_side')!);

	return {
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
		) as SideArticleScaffold[],
		verySide:
			verySide &&
			({ id: verySide.id, title: verySide.title, hook: verySide.hook } as VerySideArticleScaffold)
	};
}

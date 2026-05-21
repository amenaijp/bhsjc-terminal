<script lang="ts">
	import type { PageData } from './$types';
	import { GENRES } from '$lib/genres';
	import { debounce } from '$lib/article_editor_utils';
	import { invalidateAll } from '$app/navigation';

	// fixme: generally go over this whole file and understand exactly what is being done and why
	// fixme: double check the functionality for bugs
	// fixme: find a way to fix the typing issue on ts/js for the snippets

	let { data }: { data: PageData } = $props();

	type LayoutItem = PageData['layout'][number];

	interface Selection {
		page: string;
		slotType: LayoutItem['slotType'];
		position: number;
	}

	let selected = $state<Selection>();
	let articleQuery = $state('');
	let suggestions = $state<{ id: string; title: string; authors: string[] }[]>([]);
	let showSuggestions = $state(false);
	let saving = $state(false);

	function getSlot(page: string, slotType: LayoutItem['slotType'], position: number) {
		return data.layout.find(
			(s) => s.page === page && s.slotType === slotType && s.position === position
		);
	}

	const currentSlot = $derived(
		selected ? getSlot(selected.page, selected.slotType, selected.position) : undefined
	);

	function isSelected(page: string, slotType: string, position: number) {
		return (
			selected?.page === page && selected?.slotType === slotType && selected?.position === position
		);
	}

	const searchArticles = debounce(async (q: string) => {
		if (!q) {
			suggestions = [];
			showSuggestions = false;
			return;
		}
		const params = new URLSearchParams({ q });
		if (selected?.page && selected.page !== 'front') params.set('page', selected.page);
		const res = await fetch(`/editor/search-articles?${params}`);
		const results: { id: string; title: string; authors: string[] }[] = await res.json();

		const pinnedOnPage = new Set(
			data.layout
				.filter((s) => s.page === selected?.page && s.articleId !== null)
				.map((s) => s.articleId)
		);

		suggestions = results.filter((r) => !pinnedOnPage.has(r.id));
		showSuggestions = suggestions.length > 0;
	}, 300);

	async function pin(articleId: string | null) {
		if (!selected) return;
		saving = true;
		const body = new FormData();
		body.append('page', selected.page);
		body.append('slotType', selected.slotType);
		body.append('position', String(selected.position));
		if (articleId) body.append('articleId', articleId);
		await fetch('/editor/update-slot', { method: 'POST', body });
		await invalidateAll();
		articleQuery = '';
		suggestions = [];
		showSuggestions = false;
		saving = false;
	}
</script>

{#snippet slotBtn(
	page: string,
	slotType: LayoutItem['slotType'],
	position: number,
	classes: string
)}
	{@const slot = getSlot(page, slotType, position)}
	{@const sel = isSelected(page, slotType, position)}
	<button
		class="flex flex-col overflow-hidden rounded-xs p-1.5 text-left text-xs transition duration-200 {classes}"
		class:bg-green-200={!slot?.articleId}
		class:hover:bg-green-300={!slot?.articleId}
		class:bg-blue-200={!!slot?.articleId}
		class:hover:bg-blue-300={!!slot?.articleId}
		class:ring-2={sel}
		class:ring-green-500={!slot?.articleId}
		class:ring-blue-500={!!slot?.articleId}
		class:text-black={sel}
		onclick={() => (selected = { page, slotType, position })}
	>
		<span class="font-medium opacity-50">{slotType} {position}</span>
		{#if slot?.articleTitle}
			<span class="line-clamp-2">{slot.articleTitle}</span>
			<span class="truncate opacity-50">{slot.authors.join(', ')}</span>
		{:else}
			<span class="opacity-50">auto</span>
		{/if}
	</button>
{/snippet}

{#snippet selectionPanel()}
	<div class="ml-4 flex w-56 shrink-0 flex-col gap-2 text-sm">
		<p class="font-medium">{selected?.page} / {selected?.slotType} {selected?.position}</p>

		{#if currentSlot?.articleId}
			<div class="flex flex-col gap-0.5">
				<p>{currentSlot.articleTitle}</p>
				<p class="text-gray-500">{currentSlot.authors.join(', ')}</p>
			</div>
			<button
				onclick={() => pin(null)}
				disabled={saving}
				class="w-fit rounded-xs bg-gray-100 px-2 py-1 hover:bg-gray-200 disabled:opacity-50"
				>set to auto</button
			>
		{:else}
			<p class="text-gray-500">currently auto</p>
		{/if}

		<div class="relative">
			<input
				type="text"
				placeholder="pin an article..."
				class="w-full rounded-xs border px-2 py-1"
				value={articleQuery}
				oninput={(e) => {
					articleQuery = e.currentTarget.value;
					searchArticles(articleQuery);
				}}
				onblur={() => setTimeout(() => (showSuggestions = false), 150)}
			/>
			{#if showSuggestions}
				<!-- FIXME this suggestions thingy that's also used at article editor to add coauthors should really be it's own component -->
				<ul class="absolute z-10 w-full rounded-xs border bg-white shadow-md">
					{#each suggestions as suggestion}
						<li>
							<button
								type="button"
								class="w-full px-2 py-1.5 text-left hover:bg-gray-100"
								onclick={() => pin(suggestion.id)}
							>
								<p class="line-clamp-1">{suggestion.title}</p>
								<p class="truncate text-xs text-gray-500">{suggestion.authors.join(', ')}</p>
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		{#if saving}<p class="text-gray-400">saving...</p>{/if}
	</div>
{/snippet}

<div class="flex flex-col gap-8 p-4">
	<!-- legend -->
	<div class="flex flex-row gap-4 text-sm">
		<div class="flex items-center gap-1.5">
			<div class="h-3 w-3 rounded-xs bg-green-200"></div>
			auto
		</div>
		<div class="flex items-center gap-1.5">
			<div class="h-3 w-3 rounded-xs bg-blue-200"></div>
			pinned
		</div>
		<div class="flex items-center gap-1.5">
			<div class="h-3 w-3 rounded-xs bg-red-200"></div>
			unselectable
		</div>
	</div>

	<!-- front page -->
	<div>
		<p class="mb-2 font-medium">Front page</p>
		<div class="flex flex-row">
			<div class="grid h-120 w-240 grid-cols-4 gap-1">
				<div class="col-span-1 col-start-1 flex flex-col gap-1">
					{@render slotBtn('front', 'side', 0, 'flex-1')}
					{@render slotBtn('front', 'side', 1, 'flex-1')}
					{@render slotBtn('front', 'side', 2, 'flex-1')}
				</div>
				<div class="col-span-2 col-start-2 flex flex-col gap-1">
					{@render slotBtn('front', 'main', 0, 'flex-6')}
					{@render slotBtn('front', 'very_side', 0, 'flex-1')}
				</div>
				<div class="col-span-1 col-start-4 flex flex-col gap-1">
					<div
						class="flex flex-1 flex-col rounded-xs bg-red-200 p-1.5 text-xs hover:cursor-not-allowed"
					>
						join us
					</div>
					<div
						class="flex flex-1 flex-col rounded-xs bg-red-200 p-1.5 text-xs hover:cursor-not-allowed"
					>
						notices
					</div>
				</div>
			</div>
			{#if selected?.page === 'front'}
				{@render selectionPanel()}
			{/if}
		</div>
	</div>

	<!-- genre pages -->
	{#each GENRES as genre}
		<div>
			<p class="mb-2 font-medium">{genre}</p>
			<div class="flex flex-row">
				<div class="grid h-97.5 w-195 grid-cols-4 gap-1">
					<div class="col-span-2 col-start-1">
						{@render slotBtn(genre, 'main', 0, 'w-full h-full')}
					</div>
					<div class="col-span-1 col-start-3 flex flex-col gap-1">
						{@render slotBtn(genre, 'side', 0, 'flex-1')}
						{@render slotBtn(genre, 'side', 1, 'flex-1')}
						{@render slotBtn(genre, 'side', 2, 'flex-1')}
					</div>
					<div class="col-span-1 col-start-4 flex flex-col gap-1">
						{@render slotBtn(genre, 'side', 3, 'flex-1')}
						{@render slotBtn(genre, 'side', 4, 'flex-1')}
						{@render slotBtn(genre, 'side', 5, 'flex-1')}
					</div>
				</div>
				{#if selected?.page === genre}
					{@render selectionPanel()}
				{/if}
			</div>
		</div>
	{/each}
</div>

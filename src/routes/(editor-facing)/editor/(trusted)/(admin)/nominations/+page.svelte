<script lang="ts">
	import type { PageData } from './$types';
	import { GENRES } from '$lib/genres';
	import type { layoutSlot } from '$lib/server/db/schema';

	interface FrontPageSelection {
		slotType: typeof layoutSlot.$inferSelect.slotType;
		position: typeof layoutSlot.$inferSelect.position;
	}

	let frontPageSelected = $state<FrontPageSelection>();

	let { data }: { data: PageData } = $props();

	$inspect(frontPageSelected);
</script>

<div class="flex flex-col gap-8">
	<!-- info -->
	<div class="flex flex-col">
		<p>
			Nominate articles to be on either the front page or a genre page. <br />
			the 'auto' option fills the slots with the most recent articles, and is a reasonably fair option.
			<br />
			pin an article to a section (like the main spot) if it's especially important or current.
		</p>
	</div>
	<!-- color info -->
	<div class="flex flex-col">
		<div class="flex flex-row items-center">
			<div class="mx-2 h-12 w-12 bg-red-200"></div>
			<p>Unselectable</p>
		</div>
		<div class="flex flex-row items-center">
			<div class="mx-2 h-12 w-12 bg-green-200"></div>
			<p>auto</p>
		</div>
		<div class="flex flex-row items-center">
			<div class="mx-2 h-12 w-12 bg-blue-200"></div>
			<p>already pinned</p>
		</div>
	</div>

	<!--	front page -->
	<div class="flex flex-col">
		<p>Front page:</p>
		<div class="flex flex-row">
			<div class="grid h-120 w-240 grid-cols-4 gap-1">
				<!-- side articles -->
				<div class="col-span-1 col-start-1 flex flex-col gap-1">
					<button
						class="transition:bg flex flex-1 flex-col rounded-xs text-left duration-200 hover:cursor-pointer"
						class:bg-green-200={!data.layout.find((a) => a.slotType === 'side' && a.position === 0)
							?.articleId}
						class:hover:bg-green-100={!data.layout.find(
							(a) => a.slotType === 'side' && a.position === 0
						)?.articleId}
						class:bg-blue-200={data.layout.find((a) => a.slotType === 'side' && a.position === 0)
							?.articleId}
						class:hover:bg-blue-100={data.layout.find(
							(a) => a.slotType === 'side' && a.position === 0
						)?.articleId}
						onclick={() => {
							frontPageSelected = {
								slotType: 'side',
								position: 0
							};
						}}>side 0</button
					>
					<button
						class="transition:bg flex flex-1 flex-col rounded-xs text-left duration-200 hover:cursor-pointer"
						class:bg-green-200={!data.layout.find((a) => a.slotType === 'side' && a.position === 1)
							?.articleId}
						class:hover:bg-green-100={!data.layout.find(
							(a) => a.slotType === 'side' && a.position === 1
						)?.articleId}
						class:bg-blue-200={data.layout.find((a) => a.slotType === 'side' && a.position === 1)
							?.articleId}
						class:hover:bg-blue-100={data.layout.find(
							(a) => a.slotType === 'side' && a.position === 1
						)?.articleId}
						onclick={() => {
							frontPageSelected = {
								slotType: 'side',
								position: 1
							};
						}}>side 1</button
					>
					<button
						class="transition:bg flex flex-1 flex-col rounded-xs text-left duration-200 hover:cursor-pointer"
						class:bg-green-200={!data.layout.find((a) => a.slotType === 'side' && a.position === 2)
							?.articleId}
						class:hover:bg-green-100={!data.layout.find(
							(a) => a.slotType === 'side' && a.position === 2
						)?.articleId}
						class:bg-blue-200={data.layout.find((a) => a.slotType === 'side' && a.position === 2)
							?.articleId}
						class:hover:bg-blue-100={data.layout.find(
							(a) => a.slotType === 'side' && a.position === 2
						)?.articleId}
						onclick={() => {
							frontPageSelected = {
								slotType: 'side',
								position: 2
							};
						}}>side 2</button
					>
				</div>
				<!-- main, very side -->
				<div class="col-span-2 col-start-2 flex flex-col gap-1">
					<button
						class="transition:bg flex flex-6 flex-col rounded-xs text-left duration-200 hover:cursor-pointer"
						class:bg-green-200={!data.layout.find((a) => a.slotType === 'main' && a.position === 0)
							?.articleId}
						class:hover:bg-green-100={!data.layout.find(
							(a) => a.slotType === 'main' && a.position === 0
						)?.articleId}
						class:bg-blue-200={data.layout.find((a) => a.slotType === 'main' && a.position === 0)
							?.articleId}
						class:hover:bg-blue-100={data.layout.find(
							(a) => a.slotType === 'main' && a.position === 0
						)?.articleId}
						onclick={() => {
							frontPageSelected = {
								slotType: 'main',
								position: 0
							};
						}}>main 0</button
					>
					<button
						class="transition:bg flex flex-1 flex-col rounded-xs text-left duration-200 hover:cursor-pointer"
						class:bg-green-200={!data.layout.find(
							(a) => a.slotType === 'very_side' && a.position === 0
						)?.articleId}
						class:hover:bg-green-100={!data.layout.find(
							(a) => a.slotType === 'very_side' && a.position === 0
						)?.articleId}
						class:bg-blue-200={data.layout.find(
							(a) => a.slotType === 'very_side' && a.position === 0
						)?.articleId}
						class:hover:bg-blue-100={data.layout.find(
							(a) => a.slotType === 'very_side' && a.position === 0
						)?.articleId}
						onclick={() => {
							frontPageSelected = {
								slotType: 'very_side',
								position: 0
							};
						}}>very side 0</button
					>
				</div>
				<!-- notices, join us -->
				<div class="col-span-1 col-start-4 flex flex-col gap-1">
					<div
						class="transition:bg flex flex-1 flex-col rounded-xs bg-red-200 text-left duration-200 hover:cursor-not-allowed hover:bg-red-300"
					>
						"join us" thingy
					</div>
					<div
						class="transition:bg flex flex-1 flex-col rounded-xs bg-red-200 text-left duration-200 hover:cursor-not-allowed hover:bg-red-300"
					>
						notices
					</div>
				</div>
			</div>

			<!-- selection data -->
			{#if frontPageSelected}
				<div class="flex flex-col ml-2">
					<p>
						selected: type '{frontPageSelected.slotType}', position {frontPageSelected.position} <br />
						currently set as: {data.layout.filter(
							(e) =>
								frontPageSelected?.slotType === e.slotType &&
								frontPageSelected?.position === e.position
						)[0].articleId ? "pinned" : "auto"}
					</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- genre pages -->
	{#each GENRES as genre}
		<div class="flex flex-col">
			<p>{genre}:</p>
			<div class="grid h-97.5 w-195 grid-cols-4 gap-1">
				<!-- main, very side -->
				<div class="col-span-2 col-start-1 flex flex-col gap-1">
					<div class="flex flex-1 flex-col bg-green-200">main 0</div>
				</div>
				<!-- side articles 1 -->
				<div class="col-span-1 col-start-3 flex flex-col gap-1">
					<div class="flex flex-1 flex-col bg-green-200">side 0</div>
					<div class="flex flex-1 flex-col bg-green-200">side 1</div>
					<div class="flex flex-1 flex-col bg-green-200">side 2</div>
				</div>
				<!-- side articles 2 -->
				<div class="col-span-1 col-start-4 flex flex-col gap-1">
					<div class="flex flex-1 flex-col bg-green-200">side 3</div>
					<div class="flex flex-1 flex-col bg-green-200">side 4</div>
					<div class="flex flex-1 flex-col bg-green-200">side 5</div>
				</div>
			</div>
		</div>
	{/each}
</div>

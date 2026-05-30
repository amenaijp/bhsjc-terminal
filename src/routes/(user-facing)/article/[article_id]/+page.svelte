<script lang="ts">
	import type { PageData } from './$types';
	import { formatDistanceToNow } from 'date-fns';
	import { resolve } from '$app/paths';
	import { onVisible } from '$lib/actions/onVisible';

	let { data }: { data: PageData } = $props();

	const paragraphs = data.article.fullText.split('\n\n');
	const showAd = paragraphs.length > 5;
</script>

<svelte:head>
	<title>{data.article.title}</title>
</svelte:head>
<!-- Divider -->
<div class="my-4 flex h-0.5 rounded-xs bg-[#132d23]"></div>

<article class="mt-4 mb-4 flex max-w-275 flex-col self-center md:px-3">
	<!-- Title, Date, Journalists -->
	<header class="mb-4 flex flex-col self-center px-3 md:max-w-150 lg:max-w-200">
		<h2
			class="self-center text-left font-[Playfair] text-4xl wrap-anywhere md:text-5xl lg:text-6xl"
		>
			{data.article.title}
		</h2>
		<div class="flex flex-row">
			<p class="md:text-md mt-3 self-center text-left text-sm text-[#666666]">
				last updated {data.article.updatedAt.toLocaleDateString('en-NZ')}, {formatDistanceToNow(
					data.article.updatedAt
				)} ago
			</p>
			<div class="flex flex-1"></div>
			<p class="md:text-md mt-3 self-center text-left text-sm text-[#666666]">
				Genre{data.genres.length > 1 ? 's' : ''}:
				{#if data.genres.length > 0}
					{#each data.genres as genre, i (i)}
						<a
							class="text-black hover:cursor-pointer hover:underline"
							href={resolve(`/genre/${genre.genre}`)}
							>{genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}</a
						>{#if i < data.genres.length - 1}{', '}{/if}
					{/each}
				{:else}
					none
				{/if}
			</p>
		</div>
		<!-- FIXME: one day make a page to see all articles from a specific author. -->
		<p class="md:text-md mt-3 text-left text-sm wrap-anywhere">
			by {#each data.authors as author, i (i)}
				<b class="text-md text-[#132d23] md:text-lg">{author.name}</b
				>{#if i < data.authors.length - 2},
				{:else if i < data.authors.length - 1}{' and '}{/if}
			{/each}
		</p>
	</header>
	{#if data.article.frontImage}
		<!-- TODO: one day we should start saving the alt info -->
		<div
			class="mt-6 mb-4 flex aspect-video flex-col overflow-hidden transition-opacity duration-200 group-hover:opacity-90 md:rounded-xs"
		>
			<img alt="Front page" class="flex grow self-center" src={data.article.frontImage} />
		</div>
	{/if}
	<div class="flex flex-row self-center px-3 md:w-150 lg:w-200">
		<!-- whitespace-pre-wrap is just to get \n\n to render while using lorem ipsum, remove when using markdown-->
		<div class="flex flex-col gap-4 self-center px-3 md:w-150 lg:w-200">
			{#each paragraphs as paragraph, i (i)}
				{#if showAd && i === 3 && data.ad}
					<div class="flex flex-col items-center my-4">
						<p class="flex text-gray-400 italic">sponsored</p>
						<a href={data.ad.link} class="transition-opacity duration-200 hover:opacity-90 mx-2">
							<img
								src={data.ad.image}
								alt=""
								aria-hidden="true"
								class="grow flex rounded-xs max-w-2xs"
								use:onVisible={() => {
									window.umami.track('ad-view', { name: data.ad.name });
								}}
							/>
						</a>
					</div>
				{/if}
				<p class="text-left font-[Playfair] text-lg wrap-anywhere md:text-xl">{paragraph}</p>
			{/each}
		</div>
	</div>
</article>

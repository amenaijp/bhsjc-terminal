<script lang="ts">
	import type { PageData } from './$types';
	import { formatDistanceToNow } from 'date-fns';
	import { resolve } from '$app/paths';
	import Link from '$lib/components/common/Link.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.article.title}</title>
</svelte:head>

<Link href={resolve('/editor/open-to-feedback-articles')}>go back to OTF articles</Link>

<!-- this is copied pretty much verbatim from the /article/[article-id] route, move to a component -->

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
<!--				FIXME: shows none when there's only one associated genre -->
				{#if data.genres.length > 1}
					{#each data.genres as genre, i}
						<span class="text-black hover:cursor-pointer hover:underline"
							>{genre.genre.charAt(0).toUpperCase() + genre.genre.slice(1)}</span
						>{#if i < data.genres.length - 1}{', '}{/if}
					{/each}
				{:else}
					none
				{/if}
			</p>
		</div>
		<p class="md:text-md mt-3 text-left text-sm wrap-anywhere">
			by {#each data.authors as author, i}
				<b class="text-md text-[#132d23] hover:cursor-pointer hover:underline md:text-lg"
					>{author.name}</b
				>{#if i < data.authors.length - 2},
				{:else if i < data.authors.length - 1}{' and '}{/if}
			{/each}
		</p>
	</header>
	{#if data.article.frontImage}
		<!-- TODO: one day we should start saving the alt info -->
		<div class="mt-6 mb-4 aspect-video w-full self-center overflow-hidden md:rounded-xs md:px-5">
			<img alt="" class="h-full w-full object-cover" src={data.article.frontImage} />
		</div>
	{/if}
	<div class="flex flex-row self-center px-3 md:w-150 lg:w-200">
		<!-- whitespace-pre-wrap is just to get \n\n to render while using lorem ipsum, remove when using markdown-->
		<p class="text-left font-[Playfair] text-lg wrap-anywhere whitespace-pre-line md:text-xl">
			{data.article.fullText}
		</p>
	</div>
</article>

<script lang="ts">
	import Article from '$lib/components/article/Article.svelte';
	import { resolve } from '$app/paths';
	import type { MainArticleScaffold } from '$lib/server/db/schema';

	let { article }: { article: MainArticleScaffold } = $props();
</script>

{#if article}
	<Article link={resolve(`/article/${article.id}`)}>
		<!-- FIXME: if we ever add a dark mode, the opacity trick won't work here-->
		<div
			class="flex aspect-video flex-col overflow-hidden transition-opacity duration-200 group-hover:opacity-90 md:rounded-xs"
		>
			<img alt="Front page" class="flex grow self-center" src={article.frontImage} />
		</div>
		<h2
			class="mt-2 self-center text-center font-[Playfair] text-4xl wrap-anywhere group-hover:underline lg:text-5xl"
		>
			{article.title}
		</h2>
		<p
			class="text-md mx-4 mt-1 self-center text-center font-[Playfair] wrap-anywhere text-[#132d23] md:text-lg"
		>
			{article.hook}
		</p>
	</Article>
{:else}
	<div class="flex h-full w-full animate-pulse rounded-xs bg-gray-200 md:rounded-xs"></div>
{/if}

<script lang="ts">
	import Article from '$lib/components/article/Article.svelte';
	import type { SideArticleScaffold } from '$lib/server/db/schema';
	import { resolve } from '$app/paths';

	let { article }: { article: SideArticleScaffold } = $props();
</script>

{#if article}
	<Article link={resolve(`/article/${article.id}`)}>
		<h3
			class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl text-center"
		>
			{article.title}
		</h3>
		<p
			class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
		>
			{article.hook}
		</p>
	</Article>
{:else}
	<div class="flex flex-col gap-2 p-2">
		<div class="h-6 w-3/4 animate-pulse rounded-xs bg-gray-200"></div>
		<div class="h-4 w-full animate-pulse rounded-xs bg-gray-200"></div>
		<div class="h-4 w-2/3 animate-pulse rounded-xs bg-gray-200"></div>
	</div>
{/if}

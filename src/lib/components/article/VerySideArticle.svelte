<script lang="ts">
	import Article from '$lib/components/article/Article.svelte';
	import type { VerySideArticleScaffold } from '$lib/server/db/schema';
	import { resolve } from '$app/paths';

	let { article }: { article: VerySideArticleScaffold } = $props();
</script>

{#if article}
	<Article link={resolve(`/article/${article.id}`)} class="self-center">
		<h4 class="font-[Playfair] text-2xl wrap-anywhere group-hover:underline lg:text-3xl">
			{article.title}
		</h4>
	</Article>
{:else}
	<div class="p-2">
		<div class="h-6 w-3/4 animate-pulse rounded-xs bg-gray-200"></div>
	</div>
{/if}
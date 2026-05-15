<script lang="ts">
	import Article from '$lib/components/article/Article.svelte';
	import type { Article as ArticleType } from '$lib/server/db/schema';
	import { resolve } from '$app/paths';

	interface Props {
		article: ArticleType;
	}

	let { article }: Props = $props();
</script>

<Article link={resolve(`/article/${article.id}`)} class="self-center">
	<h4 class="font-[Playfair] text-2xl wrap-anywhere group-hover:underline lg:text-3xl">
		{article.title}
	</h4>
</Article>
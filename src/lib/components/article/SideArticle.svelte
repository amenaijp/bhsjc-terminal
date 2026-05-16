<script lang="ts">
	import Article from '$lib/components/article/Article.svelte';
	import type { Article as ArticleType } from '$lib/server/db/schema';
	import { resolve } from '$app/paths';

	interface Props {
		article: ArticleType;
	}

	let { article }: Props = $props();
</script>

<Article link={resolve(`/article/${article.id}`)}>
	<h3
		class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl"
	>
		{article.title}
	</h3>
	<p
		class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
	>
		{article.hook}
	</p>
</Article>

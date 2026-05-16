<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
</script>

<form method="POST" use:enhance action="?/newArticle">
	<button class="w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
	>create a new article</button
	>
</form>
<div class="flex flex-row gap-6 mt-4">
	<form method="GET">
			<input
				type="search"
				name="search"
				placeholder="Search for a title..."
				value={data.search}
			/>
		<button class="w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700">Search</button>
	</form>
	<p class="self-center">Displaying {data.articles.length} article(s)</p>
</div>

<script lang="ts">
	import type { PageData } from './$types';
	import { resolve } from '$app/paths';
	import Link from '$lib/components/editors/link.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="mt-4 flex flex-row gap-6">
	<form method="GET">
		<input type="search" name="search" placeholder="Search for a title..." value={data.search} />
		<button class="w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
			>Search</button
		>
	</form>
	<p class="self-center">Displaying {data.articles.length} Open To Feedback (OTF) article(s)</p>
</div>
<div class="mt-6 overflow-x-auto">
	<table class="w-fit border-collapse">
		<thead>
			<tr class="border-b border-[#E0E0E0]">
				<th class="px-2 pb-2 text-left">link</th>
				<th class="px-2 pb-2 text-left">title</th>
				<th class="px-2 pb-2 text-left">authors</th>
				<th class="px-2 pb-2 text-left">hook</th>
				<th class="px-2 pb-2 text-left">genres</th>
				<th class="px-2 pb-2 text-left">created at (dd/mm/yyyy en-nz)</th>
				<th class="px-2 pb-2 text-left">updated at (dd/mm/yyyy en-nz)</th>
			</tr>
		</thead>
		<tbody>
			{#each data.articles as article}
				<tr class="hover:bg-gray-50">
					<td class="px-2 py-1">
						<Link href={resolve(`/editor/open-to-feedback-articles/${article.id}`)}>view!</Link>
					</td>
					<td class="px-2 py-1">{article.title}</td>
					<td class="px-2 py-1">{article.authors.join(', ')}</td>
					<td class="px-2 py-1">{article.hook}</td>
					<td class="px-2 py-1">{article.genres.join(', ')}</td>
					<td class="px-2 py-1"
						>{article.createdAt.toLocaleString('en-NZ', {
							dateStyle: 'short',
							timeStyle: 'short'
						})}</td
					>
					<td class="px-2 py-1"
						>{article.updatedAt.toLocaleString('en-NZ', {
							dateStyle: 'short',
							timeStyle: 'short'
						})}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

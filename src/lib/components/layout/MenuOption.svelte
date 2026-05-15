<script lang="ts">
	import { page } from '$app/state';
	import type { ResolvedPathname } from '$app/types';

	interface Props {
		title: string;
		path: ResolvedPathname;
	}

	let { title, path }: Props = $props();

	const label = $derived(title.charAt(0).toUpperCase() + title.slice(1));

	let isActive = $derived(page.url.pathname === path);
</script>

<a href={path} class="group flex flex-row">
	<div class="w-2 flex-col" class:bg-[#FFFFFF]={!isActive} class:bg-[#000000]={isActive}></div>
	<h3 class="ml-4 py-1.5 font-[Playfair] text-3xl group-hover:underline">{label}</h3>
</a>

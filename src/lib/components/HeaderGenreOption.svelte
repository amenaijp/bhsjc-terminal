<script lang="ts">
	import type { Genre } from '$lib/genres';
	import { resolve } from '$app/paths';

	interface Props {
		genre: Genre;
		selected?: boolean;
	}

	let { genre, selected = false }: Props = $props();

	const label = $derived(genre.charAt(0).toUpperCase() + genre.slice(1));
</script>

<div class="flex flex-1 justify-center md:max-w-36 lg:max-w-48">
	<a class="group flex rounded-t-sm px-4" class:bg-[#132d23]={selected} href={resolve(`/genre/${genre}`)}>
		<h2
			class="font-[Playfair] group-hover:underline md:text-3xl lg:text-4xl"
			class:text-[#132d23]={!selected}
			class:text-[#ffffff]={selected}
		>
			{label}
		</h2>
	</a>
</div>

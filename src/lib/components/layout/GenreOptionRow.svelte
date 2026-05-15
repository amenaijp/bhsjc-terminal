<script lang="ts">
	import { type Genre, GENRES } from '$lib/genres.ts';
	import HeaderGenreOption from '$lib/components/layout/HeaderGenreOption.svelte';

	interface Props {
		select?: boolean | Genre;
	}

	let { select = false }: Props = $props();
</script>

<nav class="hidden flex-row justify-center md:flex">
	{#each GENRES as genre}
		<HeaderGenreOption {genre} selected={select === genre} />
	{/each}
</nav>

<script lang="ts">
	import type { ResolvedPathname } from '$app/types';
	import type { Snippet } from 'svelte';

	interface Props {
		href: ResolvedPathname;
		children: Snippet;
	}

	let { href, children }: Props = $props();
</script>

<a {href} class="mx-2 w-fit text-blue-600 hover:text-blue-700 hover:underline"
	>{@render children()}</a
>

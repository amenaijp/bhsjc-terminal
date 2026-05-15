<script lang="ts">
	import { clsx } from 'clsx';
	import type { ResolvedPathname } from '$app/types';
	import type { ClassValue } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		link: ResolvedPathname;
		class?: ClassValue;
	}

	let { children, link, class: className }: Props = $props();
</script>

<a class={clsx('group flex flex-col', className)} href={link}>
	{@render children()}
</a>

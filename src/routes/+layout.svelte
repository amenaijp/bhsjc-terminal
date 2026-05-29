<script lang="ts">
	import './layout.css';
	import { env } from '$env/dynamic/public';

	let { children } = $props();
</script>

<svelte:head>
	<script defer src="/umami.js" data-website-id={env.PUBLIC_UMAMI_APP_ID}></script>
</svelte:head>

{@render children()}

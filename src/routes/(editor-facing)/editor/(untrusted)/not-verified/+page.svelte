<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from '$lib/components/editors/link.svelte';
</script>

<p>
	You've successfully made your Terminal account! Make sure a club admin knows that you're waiting
	to be verified, then sit tight.
	<br />
	In the meantime, have you verified your email address yet? We may assume you're a bot or malicious actor
	if you haven't.
</p>
<Link href={resolve('/')}>return to homepage</Link>

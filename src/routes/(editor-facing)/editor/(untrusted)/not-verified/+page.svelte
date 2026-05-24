<script lang="ts">
	import { resolve } from '$app/paths';
	import Link from '$lib/components/editors/link.svelte';
	import { enhance } from '$app/forms';
</script>

<p>
	You've successfully made your Terminal account! Make sure a club admin knows that you're waiting
	to be verified, then sit tight.
	<br />
	In the meantime, have you verified your email address yet? We may assume you're a bot or malicious actor
	if you haven't.
</p>
<Link href={resolve('/')}>return to homepage</Link>
<form method="POST" use:enhance action="?/signOut">
	<button class="w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
		>sign out</button
	>
</form>

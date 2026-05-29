<script lang="ts">
	import type { PageData } from './$types';
	import Link from '$lib/components/common/Link.svelte';

	let { data }: { data: PageData } = $props();
	// FIXME: would be nice if this showed you how many published and unpublished articles you owned
</script>

<p>
	Hello, {data.user.name}! <br />
	You are currently logged in as an {data.user.userType}. <br />
</p>
<Link href="/">go to Terminal's front page</Link>

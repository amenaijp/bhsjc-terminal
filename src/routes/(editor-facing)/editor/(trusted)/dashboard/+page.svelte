<script lang="ts">
	import type { PageServerData } from './$types';
	import Link from '$lib/components/editors/link.svelte';

	let { data }: { data: PageServerData } = $props();
</script>

<p>
	Hello, {data.user.name}! <br />
	You are currently logged in as an {data.user.userType}. <br />
</p>
<Link href="/">go to Terminal's front page</Link>

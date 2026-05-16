<script lang="ts">
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<p>hi, {data.user.name}! your user id is {data.user.id}. this is the super duper secret editor's dashboard</p>

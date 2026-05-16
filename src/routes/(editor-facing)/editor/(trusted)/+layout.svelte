<script lang="ts">
	import { resolve } from "$app/paths";

	let { children } = $props();
</script>

<div class="flex flex-col">
	<nav class="flex flex-row p-4">
		<h1 class="text-5xl">Terminal Editor</h1>
		<div class="flex flex-row flex-1"></div>

		<a class="group p-1 self-center" href={resolve("/editor/dashboard")}>
			<h2 class="text-2xl group-hover:underline">Dashboard</h2>
		</a>

	</nav>
	<div class="flex h-px flex-row rounded-xs bg-[#E0E0E0]"></div>

	{@render children()}
</div>

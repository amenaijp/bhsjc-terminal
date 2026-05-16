<script lang="ts">
	import { resolve } from "$app/paths";

	let { children, data } = $props();
</script>

<div class="flex flex-col">
	<nav class="flex flex-row p-4 gap-6">
		<h1 class="text-5xl">Terminal Editor</h1>
		<div class="flex flex-row flex-1"></div>

		<a class="group self-center" href={resolve("/editor/dashboard")}>
			<h2 class="text-xl group-hover:underline">Dashboard</h2>
		</a>
		{#if data.user.userType === "admin"}
			<a class="group self-center" href={resolve("/editor/users")}>
				<h2 class="text-xl group-hover:underline">Users</h2>
			</a>
			<a class="group self-center" href={resolve("/editor/nominations")}>
				<h2 class="text-xl group-hover:underline">Nominations</h2>
			</a>
		{/if}
		<a class="group self-center" href={resolve("/editor/articles")}>
			<h2 class="text-xl group-hover:underline">My Articles</h2>
		</a>
		<a class="group self-center" href={resolve("/editor/open-to-feedback-articles")}>
			<h2 class="text-xl group-hover:underline">OTF Articles</h2>
		</a>
		<a class="group self-center" href={resolve("/editor/account")}>
			<h2 class="text-xl group-hover:underline">Account</h2>
		</a>
	</nav>
	<div class="flex h-px flex-row rounded-xs bg-[#E0E0E0]"></div>
	<div class="flex flex-col m-2">
		{@render children()}
	</div>
</div>

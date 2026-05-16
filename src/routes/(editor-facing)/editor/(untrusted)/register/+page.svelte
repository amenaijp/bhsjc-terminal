<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from "$app/paths";
	import Link from '$lib/components/editors/link.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h2 class="text-4xl my-2 underline">Terminal Registration</h2>
<form method="post" action="?/signUpEmail" use:enhance class="flex flex-col gap-1">
	<label>
		email:
		<input type="email" name="email" />
	</label>
	<label>
		password:
		<input type="password" name="password" />
	</label>
	<label>
		(real, full) name:
		<input name="name" />
	</label>
	<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2 w-fit">register</button>
</form>
<p class="my-1 text-red-500">{form?.message ?? ''}</p>
<Link href={resolve("/editor/login")}>log into an account</Link>
<Link href={resolve("/")}>return to homepage</Link>

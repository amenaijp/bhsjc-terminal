<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Link from '$lib/components/common/Link.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h2 class="my-2 text-4xl underline">Terminal Registration</h2>
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
	<button class="w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
		>register</button
	>
</form>
<p>
	please use your full name with proper capitalisation here. <br />
	it's used by club admins to verify you, and on article pages to credit your work. <br />
	if you make a mistake entering it, you can change it later once you've been verified.
</p>
<p class="my-1 text-red-500">{form?.message ?? ''}</p>
<Link href={resolve('/editor/login')}>log into an account</Link>
<Link href={resolve('/')}>return to homepage</Link>

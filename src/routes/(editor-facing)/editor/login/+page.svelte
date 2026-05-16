<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from "$app/paths";
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex m-2 flex-col">
	<h2 class="text-4xl my-2 underline">Terminal Login</h2>
	<form method="post" action="?/signInEmail" use:enhance class="flex flex-col gap-1">
		<label>
			email:
			<input type="email" name="email" />
		</label>
		<label>
			password:
			<input type="password" name="password" />
		</label>
		<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2 w-fit">login</button>
	</form>
	<p class="my-1 text-red-500">{form?.message ?? ''}</p>
	<!-- uncomment when email provider is actually implemented -->
<!--	<a href={resolve("/editor/reset-password")} class="text-blue-600 hover:text-blue-600 hover:underline mx-2 w-fit">reset password</a>-->
	<a href={resolve("/editor/register")} class="text-blue-600 hover:text-blue-600 hover:underline mx-2 w-fit">register an account</a>
	<a href={resolve("/")} class="text-blue-600 hover:text-blue-600 hover:underline mx-2 w-fit">return to homepage</a>
</div>
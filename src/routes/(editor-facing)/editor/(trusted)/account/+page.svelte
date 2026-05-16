<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
</script>

<p>
	Account information: <br />
	- Your name is set as '{data.user.name}' <br />
	- Your email address is set as '{data.user.email}' <br />
	- Your email address {data.user.emailVerified ? 'HAS' : 'has NOT'} been verified <br />
	- You currently have a user type of '{data.user.userType}' <br />
	- Your account was created at: {data.user.createdAt.toLocaleString('en-NZ', {
		dateStyle: 'short',
		timeStyle: 'short'
	})} (dd/mm/yyyy, en-NZ)
</p>
<form method="POST" use:enhance action="?/changeName">
	<label>
		change your name:
		<input
			name="name"
			value={data.user.name}
			placeholder="Your name as you want it to be displayed"
		/>
	</label>
	<button class="w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
		>submit</button
	>
</form>
<form method="POST" use:enhance action="?/signOut">
	<button class="w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
		>sign out</button
	>
</form>

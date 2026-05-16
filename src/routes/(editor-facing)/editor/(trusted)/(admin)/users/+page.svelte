<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
</script>

<!--FIXME: double check that these things (especially a lot of the conditional buttons) actually work -->

<p>Displaying {data.users.length} user(s)</p>
<form method="GET">
	<label class="flex flex-row gap-2 items-center">
		<input type="checkbox" name="unverified" value="true" checked={data.onlyUnverified} onchange={(e) => (e.currentTarget as HTMLInputElement).form?.submit()} />
		Only show unverified users
	</label>
</form>
<p>Anyone can register with any email address. if they haven't verified their email, be careful promoting them to verified.</p>
<div class="overflow-x-auto mt-6">
	<div class="grid grid-cols-[repeat(7,auto)] gap-x-4 gap-y-2 w-fit">
		<div class="contents">
			<p>Full Name</p>
			<p>Email Address</p>
			<p>Email Verified?</p>
			<p>User Type</p>
			<p>Promote</p>
			<p>Created at (dd/mm/yyyy, en-NZ)</p>
			<p>Delete</p>
		</div>
		<div class="flex h-px flex-row rounded-xs bg-[#E0E0E0] col-span-7 mx-2"></div>
		{#each data.users as user}
			<div class="contents">
				<p>{user.name}</p>
				<p>{user.email}</p>
				<p class:bg-red-100={!user.emailVerified}>{user.emailVerified ? "verified" : "NOT verified"}</p>
				<p>{user.userType}</p>
				{#if user.userType !== "admin"}
					<form method="POST" action="?/promote" use:enhance>
						<input type="hidden" name="id" value={user.id} />
						{#if user.userType === "unverified"}
							<input type="hidden" name="to" value="editor" />
							<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2">Make Editor</button>
						{:else if user.userType === "editor"}
							<input type="hidden" name="to" value="admin" />
							<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2">Make Admin</button>
						{/if}
					</form>
				{:else}
					<p class="text-gray-400">already admin</p>
				{/if}
				<p>{user.createdAt.toLocaleString('en-NZ', { dateStyle: 'short', timeStyle: 'short' })}</p>
				{#if user.userType === "unverified"}
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={user.id} />
						<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2">Delete</button>
					</form>
				{:else}
					<p class="text-gray-400">can't delete editors/admins</p>
				{/if}
			</div>
		{/each}
	</div>
</div>

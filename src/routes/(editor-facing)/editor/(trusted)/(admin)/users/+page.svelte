<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
</script>

<p>Displaying {data.users.length} user(s)</p>
<form method="GET">
	<label class="flex flex-row gap-2 items-center">
		<input type="checkbox" name="unverified" value="true" checked={data.onlyUnverified} onchange={(e) => (e.currentTarget as HTMLInputElement).form?.submit()} />
		Only show unverified users
	</label>
</form>
<p>Anyone can register with any email address. If they haven't verified their email, be careful promoting them to verified.</p>
<div class="overflow-x-auto mt-6">
	<table class="w-fit border-collapse">
		<thead>
		<tr class="border-b border-[#E0E0E0]">
			<th class="text-left px-2 pb-2">Full Name</th>
			<th class="text-left px-2 pb-2">Email Address</th>
			<th class="text-left px-2 pb-2">Email Verified?</th>
			<th class="text-left px-2 pb-2">User Type</th>
			<th class="text-left px-2 pb-2">Promote</th>
			<th class="text-left px-2 pb-2">Created at (dd/mm/yyyy, en-NZ)</th>
			<th class="text-left px-2 pb-2">Delete</th>
		</tr>
		</thead>
		<tbody>
		{#each data.users as user}
			<tr class="hover:bg-gray-50">
				<td class="px-2 py-1">{user.name}</td>
				<td class="px-2 py-1">{user.email}</td>
				<td class="px-2 py-1" class:bg-red-100={!user.emailVerified}>{user.emailVerified ? 'verified' : 'NOT verified'}</td>
				<td class="px-2 py-1">{user.userType}</td>
				<td class="px-2 py-1">
					{#if user.userType !== 'admin'}
						<form method="POST" action="?/promote" use:enhance>
							<input type="hidden" name="id" value={user.id} />
							{#if user.userType === 'unverified'}
								<input type="hidden" name="to" value="editor" />
								<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2">Make Editor</button>
							{:else if user.userType === 'editor'}
								<input type="hidden" name="to" value="admin" />
								<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2">Make Admin</button>
							{/if}
						</form>
					{:else}
						<p class="text-gray-400">already admin</p>
					{/if}
				</td>
				<td class="px-2 py-1">{user.createdAt.toLocaleString('en-NZ', { dateStyle: 'short', timeStyle: 'short' })}</td>
				<td class="px-2 py-1">
					{#if user.userType === 'unverified'}
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={user.id} />
							<button class="rounded-sm bg-blue-600 hover:bg-blue-700 text-white transition py-1 px-2">Delete</button>
						</form>
					{:else}
						<p class="text-gray-400">can't delete editors/admins</p>
					{/if}
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
</div>
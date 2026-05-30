<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let image = $state<string>();

	let uploadError = $state<string>();
	let uploading = $state(false);
	let uploadImageElement = $state<HTMLInputElement>();

	const submitForm = (e: Event) => {
		(e.currentTarget as HTMLInputElement).form?.submit();
	};

	let { data }: { data: PageData } = $props();
</script>

<form
	method="POST"
	use:enhance={() => {
		return ({ update }) => {
			image = undefined;
			if (uploadImageElement) uploadImageElement.value = '';
			update();
		};
	}}
	action="?/create"
>
	<input type="hidden" name="image" value={image} />
	<label>
		Campaign Name (required)
		<input type="text" name="name" required />
	</label>
	<label>
		Link on click (required)
		<input type="text" name="link" required />
	</label>
	<label>
		Make campaign active immediately
		<input type="checkbox" name="active" />
	</label>
	<button
		class="w-fit rounded-xs bg-gray-100 px-2 py-1 hover:bg-gray-200 disabled:opacity-50"
		disabled={!image}>Submit</button
	>

	<!-- upload image/clear image/preview image -->
	<div class="flex flex-col">
		<label class="w-fit">
			Campaign image (max 25MB)
			<input
				type="file"
				accept="image/*"
				bind:this={uploadImageElement}
				class="hidden"
				onchange={async (e) => {
					const file = e.currentTarget.files?.[0];
					if (!file) return;

					// client-side check before even hitting the server
					if (file.size > 25 * 1024 * 1024) {
						uploadError = 'Image must be under 25MB';
						return;
					}

					uploadError = '';
					uploading = true;

					try {
						const fd = new FormData();
						fd.append('image', file);

						// see /routes/(editor-facing)/editor/(trusted)/image-upload/+server.ts
						const res = await fetch('/editor/image-upload', { method: 'POST', body: fd });

						if (!res.ok) {
							const { message } = await res.json();
							uploadError = message ?? 'Upload failed';
							return;
						}

						const { url } = await res.json();
						image = url;
					} catch {
						uploadError = 'Something went wrong, please try again';
					} finally {
						uploading = false;
					}
				}}
			/>
			<button
				class="w-fit rounded-xs bg-gray-100 px-2 py-1 hover:bg-gray-200 disabled:opacity-50"
				type="button"
				onclick={() => uploadImageElement?.click()}
			>
				{image ? 'Change image...' : 'Upload an image...'}
			</button>
		</label>

		{#if uploadError}
			<p class="text-red-600">{uploadError}</p>
		{/if}

		{#if uploading}
			<p>Uploading...</p>
		{/if}

		{#if image}
			<img src={image} alt="cover preview" class="grow flex max-w-xl rounded-xs ml-2" />
		{/if}
	</div>
</form>
<p class="my-6">
	displaying {data.ads.length} ad(s) <br />
	*Not actually representative of how many views this ad has gotten. Check the analytics page if you really
	want to know!
</p>
<form method="GET">
	<label>
		Search for a specific campaign:
		<input type="search" name="search" value={data.search} onchange={submitForm} />
	</label>
	<label>
		Only show active campaigns:
		<input
			type="checkbox"
			name="activeOnly"
			value="true"
			checked={data.activeOnly}
			onchange={submitForm}
		/>
	</label>
</form>
<table class="w-fit border-collapse">
	<thead>
		<tr class="border-b border-[#E0E0E0]">
			<th class="px-2 pb-2 text-left">Campaign Image</th>
			<th class="px-2 pb-2 text-left">Campaign Name</th>
			<th class="px-2 pb-2 text-left">Target Link</th>
			<th class="px-2 pb-2 text-left">Active</th>
			<th class="px-2 pb-2 text-left">Views*</th>
			<th class="px-2 pb-2 text-left">Delete</th>
		</tr>
	</thead>
	<tbody>
		{#each data.ads as ad (ad.id)}
			<tr class="hover:bg-gray-50">
				<td class="px-2 py-1">
					<img src={ad.image} alt="cover preview" class="grow flex max-w-2xs rounded-xs ml-2" />
				</td>
				<td class="px-2 py-1">{ad.name}</td>
				<td class="px-2 py-1">{ad.link}</td>
				<td class="px-2 py-1" class:bg-green-100={ad.active}>
					<div class="flex flex-row gap-2 items-center">
						<p>
							{ad.active}
						</p>
						<form method="POST" action="?/toggleActive" use:enhance>
							<input type="hidden" name="id" value={ad.id} />
							<input type="hidden" name="setTo" value={String(!ad.active)} />
							<button
								type="submit"
								class="w-fit rounded-xs bg-gray-100 px-2 py-1 hover:bg-gray-200 disabled:opacity-50"
							>
								toggle
							</button>
						</form>
					</div>
				</td>
				<td class="px-2 py-1">{ad.views}</td>
				<td class="px-2 py-1">
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={ad.id} />
						<button
							type="submit"
							class="w-fit rounded-xs bg-gray-100 px-2 py-1 hover:bg-gray-200 disabled:opacity-50"
						>
							delete
						</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { debounce, excerpt } from '$lib/article_editor_utils';
	import { type Genre, GENRES } from '$lib/genres';

	let { data }: { data: PageData } = $props();

	// we need to be able to edit:
	// - [x] article title
	// - [x] user written hook (and be able to see the current hook)
	// - [x] toggle whether the article is OTF
	// - [x] toggle whether the article is published
	// - [x] edit the text of the actual article
	// - [x] upload images to use as the front page image
	// - [x] one toggle for each genre the article is a part of
	// - [ ] a drop down menu to add other authors

	// there _should_ be a better way to do this but for now this works
	// fields from schema `article`
	let title = $state($state.snapshot(data.article_data.title));
	let fullText = $state($state.snapshot(data.article_data.fullText));
	let userHook = $state($state.snapshot(data.article_data.userWrittenHook));
	let hook = $derived(userHook || excerpt(fullText));
	let openToFeedback = $state($state.snapshot(data.article_data.openToFeedback));
	let published = $state($state.snapshot(data.article_data.published));
	let frontImage = $state($state.snapshot(data.article_data.frontImage));

	// fields from schema `articleGenre`
	let genres = $state($state.snapshot(data.genres));

	// for uploading the front image
	let uploadError = $state<string>();
	let uploading = $state(false);
	let uploadImageElement = $state<HTMLInputElement>();

	let syncStatus = $state<'idle' | 'dirty' | 'syncing' | 'synced' | 'error'>('idle');
	let FormElement = $state<HTMLFormElement>();

	const triggerSave = debounce(() => {
		FormElement?.requestSubmit();
	}, 1000);

	function onInput() {
		syncStatus = 'dirty';
		triggerSave();
	}

	let textarea = $state<HTMLTextAreaElement>();

	function autoResize() {
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = textarea.scrollHeight + 'px';
		}
	}

	function toggleGenre(genre: Genre, checked: boolean) {
		if (checked && !genres.includes(genre)) {
			genres.push(genre);
		} else if (!checked && genres.includes(genre)) {
			genres.splice(genres.indexOf(genre), 1);
		}
	}

	$inspect(genres);

	$effect(() => {
		if (textarea) {
			autoResize();
		}
	});
</script>

<div class="m-4 flex grow flex-row">
	<p class="text-3xl">editing '{title}'</p>
	<div class="flex grow flex-row"></div>
	<div class="flex flex-col self-center">
		<p class="self-center" class:bg-red-100={!['synced', 'idle'].includes(syncStatus)}>
			sync status: {syncStatus}
		</p>
		<button
			onclick={() => FormElement?.requestSubmit()}
			class="rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
			>manually save</button
		>
	</div>
</div>

<form
	method="POST"
	action="?/save"
	bind:this={FormElement}
	use:enhance={() => {
		syncStatus = 'syncing';
		return async ({ result }) => {
			if (result.type === 'success') {
				syncStatus = 'synced';
			} else {
				syncStatus = 'error';
			}
		};
	}}
	class="flex flex-col gap-4"
>
	<!-- hidden inputs carry the $state values to the server -->
	<input type="hidden" name="title" value={title} />
	<input type="hidden" name="fullText" value={fullText} />
	<input type="hidden" name="userWrittenHook" value={userHook} />
	<input type="hidden" name="hook" value={hook} />
	<input type="hidden" name="openToFeedback" value={openToFeedback} />
	<input type="hidden" name="published" value={published} />
	<input type="hidden" name="frontImage" value={frontImage} />
	<input type="hidden" name="genres" value={JSON.stringify(genres)} />

	<!-- edit article title -->
	<label>
		Article title
		<input
			value={title}
			oninput={(e) => {
				title = e.currentTarget.value;
				onInput();
			}}
		/>
	</label>

	<!-- edit hook -->
	<div class="flex flex-row">
		<label class="my-2 flex flex-1 flex-row items-center">
			Article Hook
			<textarea
				class="ml-2 w-full rounded-md px-3 py-2"
				rows="4"
				oninput={(e) => {
					userHook = e.currentTarget.value;
					onInput();
				}}>{userHook}</textarea
			>
		</label>
		<p class="mx-4 flex-1">
			If you don't provide your own hook, up to the first three sentences of your article will be
			used instead. <br />
			recommended: ~100 characters, max: 200 characters, current: {userHook.length || hook.length} characters
			<br />
			current hook: <br />
			{hook}
		</p>
	</div>

	<!-- boolean edits (OTF, published) -->
	<div class="flex flex-col">
		<label class="flex w-fit flex-row items-center gap-2">
			Article is OTF? (open for feedback, any editor can see the article)
			<input
				checked={openToFeedback}
				oninput={(e) => {
					openToFeedback = e.currentTarget.checked;
					onInput();
				}}
				type="checkbox"
			/>
		</label>
		<label class="flex w-fit flex-row items-center gap-2">
			Article is published? (visible on the main website)
			<input
				checked={published}
				oninput={(e) => {
					published = e.currentTarget.checked;
					onInput();
				}}
				type="checkbox"
			/>
		</label>
	</div>

	<!-- upload image/clear image/preview image -->
	<div class="flex flex-col">
		<label class="w-fit">
			Cover image
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
						frontImage = url;
						onInput(); // sync the new image url to the server
					} catch (e) {
						uploadError = 'Something went wrong, please try again';
					} finally {
						uploading = false;
					}
				}}
			/>
			<button
				class="m-2 w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
				onclick={() => uploadImageElement?.click()}
			>
				{frontImage ? 'Change image...' : 'Upload an image...'}
			</button>
			<button
				class="m-2 w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
				onclick={() => {
					frontImage = '';
					onInput();
				}}
			>
				Clear Image
			</button>
		</label>

		{#if uploadError}
			<p class="text-red-600">{uploadError}</p>
		{/if}

		{#if uploading}
			<p>Uploading...</p>
		{/if}

		{#if frontImage}
			<div class="ml-2 flex flex-col">
				<p>
					Below the image as it would be shown on the front page on a large display is shown <br />
					Note that images are cropped to a 16:9 aspect ratio
				</p>
				<img src={frontImage} alt="cover preview" class="flex aspect-video max-w-3xl rounded-xs" />
			</div>
		{/if}
	</div>

	<!-- edit genres -->
	<div class="flex flex-col">
		<p>Select all genres your article belongs to</p>
		{#each GENRES as genre}
			<label class="ml-2 w-fit">
				{genre}
				<input
					type="checkbox"
					checked={genres.includes(genre)}
					oninput={(e) => {
						toggleGenre(genre, e.currentTarget.checked);
						onInput();
					}}
				/>
			</label>
		{/each}
	</div>

	<!-- edit article fullText -->
	<div class="flex flex-col">
		<label for="article-fulltext-textarea self-center">Article text</label>
		<textarea
			id="article-fulltext-textarea"
			oninput={(e) => {
				fullText = e.currentTarget.value;
				onInput();
				autoResize();
			}}
			bind:this={textarea}
			rows="1"
			class="resize-none overflow-hidden rounded-md px-3 py-2">{fullText}</textarea
		>
	</div>
</form>

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
	// - [x] a drop-down menu to add other authors

	// there _should_ be a better way to do this but for now this works
	// FIXME: find the better way
	// FIXME: one day have the whole codebase be svelte-check compliant
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

	// fields for the co-authors feature
	let authorQuery = $state('');
	let suggestions = $state<{ id: string; name: string }[]>([]);
	let coauthors = $state<{ id: string; name: string }[]>(data.article_authors);
	let showSuggestions = $state(false);

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

	const searchAuthors = debounce(async (q: string) => {
		if (!q) {
			suggestions = [];
			return;
		}
		const res = await fetch(`/editor/author-query?q=${encodeURIComponent(q)}`);
		suggestions = await res.json();
		showSuggestions = true;
	}, 200);

	$effect(() => {
		if (textarea) {
			autoResize();
		}
	});
</script>

<div class="m-4 flex grow flex-row items-center">
	<p class="text-3xl">editing '{title}'</p>
	<div class="flex grow flex-row"></div>
	<form method="POST" action="?/delete" use:enhance>
		<button
			type="submit"
			class="mx-4 rounded-sm bg-red-600 px-2 py-1 text-white transition hover:bg-red-700"
		>
			delete article (irreversible!)
		</button>
	</form>
	<div class="flex flex-col">
		<p class:bg-red-100={!['synced', 'idle'].includes(syncStatus)}>
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
	<input type="hidden" name="coauthors" value={JSON.stringify(coauthors.map((a) => a.id))} />

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
			Article is OTF? (Open To Feedback, any editor can see the article)
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

	<!-- co-author search -->
	<div class="flex flex-col">
		<p>
			Co-authors (They won't be able to edit this article, but on the main website you will all be
			listed) <br />
			You, as the article owner, will always be listed on the article regardless of your options here.
		</p>

		<div class="relative w-fit">
			<input
				type="text"
				placeholder="Search for co-authors..."
				value={authorQuery}
				oninput={(e) => {
					authorQuery = e.currentTarget.value;
					searchAuthors(authorQuery);
				}}
				onblur={() => setTimeout(() => (showSuggestions = false), 150)}
			/>

			{#if showSuggestions && suggestions.length > 0}
				<ul class="absolute z-10 w-full rounded-md border bg-white shadow-md">
					{#each suggestions as user}
						<li>
							<button
								type="button"
								class="w-full px-3 py-2 text-left hover:bg-gray-100"
								onclick={() => {
									if (!coauthors.find((a) => a.id === user.id)) {
										coauthors.push(user);
									}
									authorQuery = '';
									suggestions = [];
									showSuggestions = false;
									onInput();
								}}
							>
								{user.name}
							</button>
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		<!-- selected co-authors -->
		{#each coauthors as author}
			<div class="ml-4 flex flex-row items-center gap-2">
				<p>{author.name}</p>
				<button
					type="button"
					onclick={() => {
						coauthors.splice(coauthors.indexOf(author), 1);
						onInput();
					}}
					class="m-2 w-fit rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700"
					>remove</button
				>
			</div>
		{/each}
	</div>

	<!-- upload image/clear image/preview image -->
	<div class="flex flex-col">
		<label class="w-fit">
			Cover image (max 25MB)
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
				type="button"
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
			<!--			<div-->
			<!--				class="aspect-video transition-opacity duration-200 group-hover:opacity-90 md:rounded-xs flex flex-col"-->
			<!--			>-->
			<!--				<img alt="Front page" class="flex self-center grow" src={article.frontImage} />-->
			<!--			</div>-->
			<div class="ml-2 flex flex-col">
				<p>
					Below the image as it would be shown on the front page on a large display is shown <br />
					Note that images will be cropped to 16:9
				</p>
				<div class="flex aspect-video max-w-3xl flex-col overflow-hidden rounded-xs">
					<img src={frontImage} alt="cover preview" class="flex grow self-center" />
				</div>
			</div>
		{/if}
	</div>

	<!-- edit genres -->
	<div class="flex flex-col">
		<p>Select all genres your article belongs to:</p>
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

<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { debounce, excerpt } from '$lib/article_editor_utils';

	let { data }: { data: PageData } = $props();

	// we need to be able to edit:
	// - [x] article title
	// - [ ] user written hook (and be able to see the current hook)
	// - [ ] toggle whether the article is OTF
	// - [ ] toggle whether the article is published
	// - [x] edit the text of the actual article
	// - [ ] upload images to use as the front page image
	// - [ ] one toggle for each genre the article is a part of
	// - [ ] a drop down menu to add other authors

	// there _should_ be a better way to do this but for now this works
	let title = $state($state.snapshot(data.article_data.title));
	let fullText = $state($state.snapshot(data.article_data.fullText));
	let userHook = $state($state.snapshot(data.article_data.userWrittenHook));
	let hook = $derived(userHook || excerpt(fullText));

	let syncStatus = $state<'idle' | 'dirty' | 'syncing' | 'synced' | 'error'>('idle');
	let formEl = $state<HTMLFormElement>();

	const triggerSave = debounce(() => {
		formEl?.requestSubmit();
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
		<button onclick={() => formEl?.requestSubmit()} class="rounded-sm bg-blue-600 px-2 py-1 text-white transition hover:bg-blue-700">manually save</button>
	</div>
</div>

<form
	method="POST"
	action="?/save"
	bind:this={formEl}
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
	class="flex flex-col"
>
	<!-- hidden inputs carry the $state values to the server -->
	<input type="hidden" name="title" value={title} />
	<input type="hidden" name="fullText" value={fullText} />
	<input type="hidden" name="userWrittenHook" value={userHook} />
	<input type="hidden" name="hook" value={hook} />

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
	<label for="article-fulltext-textarea self-center" class="mt-4">Article text</label>
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
</form>

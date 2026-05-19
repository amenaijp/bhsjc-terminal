<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import debounce from '$lib/debouce';

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
	<p class="self-center" class:bg-red-100={!["synced", "idle"].includes(syncStatus)}>sync status: {syncStatus}</p>
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

	<label for="article-fulltext-textarea" class="mt-4">Article text</label>
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

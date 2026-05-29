<script lang="ts">
	import GenreOptionRow from '$lib/components/layout/GenreOptionRow.svelte';
	import MainArticle from '$lib/components/article/MainArticle.svelte';
	import SideArticle from '$lib/components/article/SideArticle.svelte';
	import VerySideArticle from '$lib/components/article/VerySideArticle.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Terminal</title>
</svelte:head>

<!-- FIXME: proper svelte:head's across the codebase (especially in editor pages) -->
<!-- FIXME: proper Terminal T favicon would go nicely -->

<!-- genre selector -->
<GenreOptionRow />

<!-- top articles -->
<div
	class="mt-4 grid max-w-384 grid-cols-1 gap-2 self-center md:grid-cols-6 md:px-3 lg:grid-cols-4"
>
	<!-- Main article, very side article-->
	<div class="flex flex-col md:col-span-4 md:col-start-3 lg:col-span-2 lg:col-start-2">
		<!-- Main Article -->
		<MainArticle article={data.main} />
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Very Side Article -->
		<VerySideArticle article={data.verySide} />
	</div>

	<!-- Mobile divider between main article and side articles -->
	<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:hidden"></div>

	<!-- Side Articles -->
	<div class="flex flex-col px-2 md:col-span-2 md:col-start-1 md:row-start-1 md:mt-6 lg:col-span-1">
		<!-- Side Article 1 -->
		<SideArticle article={data.sides[0]} />
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Side Article 2 -->
		<SideArticle article={data.sides[1]} />
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Side Article 3 -->
		<SideArticle article={data.sides[2]} />
	</div>

	<!-- Mobile divider between side articles and join us -->
	<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:hidden"></div>

	<!-- "Join us", notices-->
	<div
		class="flex flex-col px-2 md:col-span-6 md:col-start-1 md:row-start-2 md:mt-6 md:flex-row lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:mt-0 lg:flex-col"
	>
		<!-- "JOIN US"-->
		<div class="flex flex-col md:mt-6 md:flex-1 lg:flex-0">
			<h2
				class="mb-2 self-center rounded-xs bg-[#37543a] p-2 font-[Playfair] text-4xl text-[#FFFFFF] lg:text-5xl"
			>
				JOIN US
			</h2>
			<p
				class="text-md self-center text-center font-[Playfair] wrap-anywhere text-[#132d23] md:text-lg"
			>
				Meetings are every Friday at lunchtime in B3, come along if you're interested!!! Or get in
				contact: journalismclub@burnside.school.nz
			</p>
		</div>
		<!-- Vertical/Horizontal Divider -->
<!--		<div-->
<!--			class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:mx-4 md:my-8 md:h-auto md:w-0.5 lg:mx-8 lg:my-4 lg:h-0.5 lg:w-auto"-->
<!--		></div>-->
<!--		&lt;!&ndash; Notices &ndash;&gt;-->
<!--		<div class="flex flex-col md:flex-1 lg:flex-0">-->
<!--			<h3 class="self-center font-[Playfair] text-3xl wrap-anywhere text-[#37543a] lg:text-4xl">-->
<!--				Notices-->
<!--			</h3>-->
<!--			<div class="flex flex-row">-->
<!--				<div class="flex flex-1 flex-col">-->
<!--					<h4 class="self-center font-[Playfair] text-xl text-[#132d23] lg:text-2xl">JUNIORS</h4>-->
<!--				</div>-->
<!--				&lt;!&ndash; Vertical Divider &ndash;&gt;-->
<!--				<div class="mx-4 my-8 flex min-h-8 w-0.5 rounded-xs bg-[#E0E0E0]"></div>-->
<!--				<div class="flex flex-1 flex-col">-->
<!--					<h4 class="self-center font-[Playfair] text-xl text-[#132d23] lg:text-2xl">SENIORS</h4>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
		<!-- advertising space -->
		<!-- divider -->
		<div
			class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:mx-4 md:my-8 md:h-auto md:w-0.5 lg:mx-8 lg:my-4 lg:h-0.5 lg:w-auto"
		></div>
		<div class="flex flex-col md:flex-1 lg:flex-0">
			<p class="text-gray-400 flex flex-row self-center italic">sponsored</p>
			<div
				class="flex aspect-video max-h-60 items-center justify-center rounded-md bg-red-600 md:flex-1 lg:flex-0"
			>
				<p class="text-xl text-white">Your ad could go here!</p>
			</div>
		</div>
	</div>
</div>

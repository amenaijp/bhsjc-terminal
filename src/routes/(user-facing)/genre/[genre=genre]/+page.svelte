<script lang="ts">
	import GenreOptionRow from '$lib/components/layout/GenreOptionRow.svelte';
	import type { Article } from '$lib/server/db/schema';
	import MainArticle from '$lib/components/article/MainArticle.svelte';
	import SideArticle from '$lib/components/article/SideArticle.svelte';
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	const defaultArticle: Article = {
		date: Date.now(),
		id: 'test-article-awawawawawa',
		hook: 'bazinga what an interesting hook to what must be such an interesting article awooga i need \n\nto make this text long enough to get interesting functionality',
		fullText:
			'dsufhsudhfushdfusdfdsf\n\nsdfsdfsdfsdfadsddfhsudhfsfd\n\nsduhfusdhguewrgyuewfhg\n\nsdjgudfhgudshfgusdhfgsdfg\n\nusdfjgushfdguhsdufghusdfhgusdfhg\n\nudhfguhdfughsdf',
		frontImage: 'https://picsum.photos/1920/1080',
		title: 'genre an title!!!111!',
		ownerId: 'owner-id-goes-here'
	};

	let { data }: { data: PageData } = $props();

	const label = data.genre.charAt(0).toUpperCase() + data.genre.slice(1);
</script>

<svelte:head>
	<title>{label}</title>
</svelte:head>

<!-- genre selector -->
<GenreOptionRow select={data.genre} />

<!-- Shows what genre you're on when mobile (and also acts as some my-) -->
<a
	class="group mt-2 flex justify-center bg-[#132d23] md:mt-0 md:mb-4 md:h-0.5 md:rounded-xs"
	href={resolve(`/genre/${data.genre}`)}
>
	<h2 class="flex font-[Playfair] text-3xl text-[#ffffff] group-hover:underline md:hidden">
		{label}
	</h2>
</a>

<!-- top articles -->
<div
	class="grid max-w-312 grid-cols-1 gap-2 self-center md:mt-4 md:grid-cols-6 md:px-3 lg:grid-cols-4"
>
	<!-- Main article, very side article-->
	<div class="col-start-1 row-start-1 flex flex-col md:col-span-4 md:row-span-2 lg:col-span-2">
		<!-- Main Article -->
		<MainArticle article={defaultArticle} />
	</div>

	<!-- Mobile divider between main article and side articles -->
	<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:hidden"></div>

	<!-- Side Articles -->
	<div
		class="flex flex-col px-2 md:col-span-2 md:col-start-5 md:row-span-2 md:row-start-1 md:mt-6 lg:col-span-1 lg:col-start-3"
	>
		<!-- Side Article 1 -->
		<SideArticle article={defaultArticle} />
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Side Article 2 -->
		<SideArticle article={defaultArticle} />
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Side Article 3 -->
		<SideArticle article={defaultArticle} />
	</div>

	<!-- Mobile divider between side articles and join us -->
	<div
		class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:col-span-6 md:col-start-1 md:row-start-3 md:my-2 md:bg-[#FFFFFF] lg:hidden"
	></div>

	<!-- Side Articles -->
	<div
		class="flex flex-col px-2 md:col-span-6 md:col-start-1 md:row-start-4 md:mt-6 md:flex-row lg:col-span-1 lg:col-start-4 lg:row-start-1 lg:flex-col"
	>
		<!-- Side Article 4 -->
		<SideArticle article={defaultArticle} />
		<!-- Divider -->
		<div
			class="mx-8 my-4 flex h-0.5 w-auto shrink-0 rounded-xs bg-[#E0E0E0] md:mx-4 md:my-8 md:h-auto md:w-0.5 lg:mx-8 lg:my-4 lg:h-0.5 lg:w-auto"
		></div>
		<!-- Side Article 5 -->
		<SideArticle article={defaultArticle} />
		<!-- Divider -->
		<div
			class="mx-8 my-4 flex h-0.5 w-auto shrink-0 rounded-xs bg-[#E0E0E0] md:mx-4 md:my-8 md:h-auto md:w-0.5 lg:mx-8 lg:my-4 lg:h-0.5 lg:w-auto"
		></div>
		<!-- Side Article 6 -->
		<SideArticle article={defaultArticle} />
	</div>
</div>

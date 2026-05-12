<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.genre}</title>
</svelte:head>

<!-- genre selector -->
<nav class="hidden flex-row justify-center md:flex">
	<div class="flex flex-1 justify-center md:max-w-[9rem] lg:max-w-[12rem]">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				Sport
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-[9rem] lg:max-w-[12rem]">
		<a class="group flex rounded-t-sm bg-[#132d23] px-4" href="#">
			<h2 class="font-[Playfair] text-[#ffffff] group-hover:underline md:text-3xl lg:text-4xl">
				Cultural
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-[9rem] lg:max-w-[12rem]">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				Opinion
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-[9rem] lg:max-w-[12rem]">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				School
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-[9rem] lg:max-w-[12rem]">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				Other
			</h2>
		</a>
	</div>
</nav>

<!-- Divider -->
<a
	class="group mt-2 flex justify-center bg-[#132d23] md:mt-0 md:mb-4 md:h-0.5 md:rounded-xs"
	href="#"
>
	<h2 class="flex font-[Playfair] text-3xl text-[#ffffff] group-hover:underline md:hidden">
		Cultural
	</h2>
</a>

<!-- top articles -->
<div
	class="grid max-w-[1536px] grid-cols-1 gap-2 self-center md:mt-4 md:grid-cols-6 md:px-3 lg:grid-cols-4"
>
	<!-- Main article, very side article-->
	<div class="col-start-1 row-start-1 flex flex-col md:col-span-4 md:row-span-2 lg:col-span-2">
		<!-- Main Article -->
		<a class="group flex flex-col" href="#">
			<!-- FIXME: if we ever add a dark mode, the opacity trick won't work here-->
			<img
				alt="Front page Image"
				class="flex aspect-video transition-opacity duration-200 group-hover:opacity-90 md:rounded-xs"
				src="https://picsum.photos/1920/1080"
			/>
			<h2
				class="mt-2 self-center font-[Playfair] text-4xl wrap-anywhere group-hover:underline lg:text-5xl"
			>
				Article Title
			</h2>
			<p
				class="text-md mx-4 mt-1 self-center text-center font-[Playfair] wrap-anywhere text-[#132d23] md:text-lg"
			>
				blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
				blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
				blah blah blah blah blah blah blah blah blah
			</p>
		</a>
	</div>

	<!-- Mobile divider between main article and side articles -->
	<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:hidden"></div>

	<!-- Side Articles -->
	<div
		class="flex flex-col px-2 md:col-span-2 md:col-start-5 md:row-span-2 md:row-start-1 md:mt-6 lg:col-span-1 lg:col-start-3"
	>
		<!-- Side Article 1 -->
		<a class="group flex flex-col" href="#">
			<h3
				class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl"
			>
				Side Article 1
			</h3>
			<p
				class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
			>
				Here is a brief overview of the article in a few short sentences
			</p>
		</a>
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Side Article 2 -->
		<a class="group flex flex-col" href="#">
			<h3
				class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl"
			>
				Side Article 2
			</h3>
			<p
				class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
			>
				Here is a brief overview of the article in a few short sentences. However, this is a longer
				article with possibly a photo, so right now there are a bunch of random words that are just
				here.
			</p>
		</a>
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Side Article 3 -->
		<a class="group flex flex-col" href="#">
			<h3
				class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl"
			>
				Side Article 3
			</h3>
			<p
				class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
			>
				Here is the last one where its very tiny and small bean
			</p>
		</a>
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
		<a class="group flex flex-col" href="#">
			<h3
				class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl"
			>
				Side Article 4
			</h3>
			<p
				class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
			>
				Here is a brief overview of the article in a few short sentences. However, this is a longer
				article with possibly a photo, so right now there are a bunch of random words that are just
				here.
			</p>
		</a>
		<!-- Divider -->
		<div
			class="mx-8 my-4 flex h-0.5 w-auto shrink-0 rounded-xs bg-[#E0E0E0] md:mx-4 md:my-8 md:h-auto md:w-0.5 lg:mx-8 lg:my-4 lg:h-0.5 lg:w-auto"
		></div>
		<!-- Side Article 5 -->
		<a class="group flex flex-col" href="#">
			<h3
				class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl"
			>
				Side Article 5
			</h3>
			<p
				class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
			>
				Here is the last one where its very tiny and small bean
			</p>
		</a>
		<!-- Divider -->
		<div
			class="mx-8 my-4 flex h-0.5 w-auto shrink-0 rounded-xs bg-[#E0E0E0] md:mx-4 md:my-8 md:h-auto md:w-0.5 lg:mx-8 lg:my-4 lg:h-0.5 lg:w-auto"
		></div>
		<!-- Side Article 6 -->
		<a class="group flex flex-col" href="#">
			<h3
				class="self-center font-[Playfair] text-2xl wrap-anywhere text-[#37543a] group-hover:underline lg:text-3xl"
			>
				Side Article 6
			</h3>
			<p
				class="self-center text-center font-[Playfair] text-base wrap-anywhere text-[#132d23] md:text-lg"
			>
				Here is a brief overview of the article in a few short sentences
			</p>
		</a>
	</div>
</div>

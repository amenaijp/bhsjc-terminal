<svelte:head>
	<title>Terminal</title>
</svelte:head>

<!-- genre selector -->
<nav class="hidden flex-row justify-center md:flex">
	<div class="flex flex-1 justify-center md:max-w-36 lg:max-w-48">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				Sport
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-36 lg:max-w-48">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				Cultural
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-36 lg:max-w-48">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				Opinion
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-36 lg:max-w-48">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				School
			</h2>
		</a>
	</div>
	<div class="flex flex-1 justify-center md:max-w-36 lg:max-w-48">
		<a class="group flex px-4" href="#">
			<h2 class="font-[Playfair] text-[#132d23] group-hover:underline md:text-3xl lg:text-4xl">
				Other
			</h2>
		</a>
	</div>
</nav>

<!-- top articles -->
<div
	class="mt-4 grid max-w-384 grid-cols-1 gap-2 self-center md:grid-cols-6 md:px-3 lg:grid-cols-4"
>
	<!-- Main article, very side article-->
	<div class="flex flex-col md:col-span-4 md:col-start-3 lg:col-span-2 lg:col-start-2">
		<!-- Main Article -->
		<a class="group flex flex-col" href="#">
			<!-- FIXME: if we ever add a dark mode, the opacity trick won't work here-->
			<img
				alt="Front page"
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
		<!-- Divider -->
		<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0]"></div>
		<!-- Very Side Article -->
		<a class="group flex justify-center" href="#">
			<h4 class="font-[Playfair] text-2xl wrap-anywhere group-hover:underline lg:text-3xl">
				Another random article
			</h4>
		</a>
	</div>

	<!-- Mobile divider between main article and side articles -->
	<div class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:hidden"></div>

	<!-- Side Articles -->
	<div class="flex flex-col px-2 md:col-span-2 md:col-start-1 md:row-start-1 md:mt-6 lg:col-span-1">
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
		<div
			class="mx-8 my-4 flex h-0.5 rounded-xs bg-[#E0E0E0] md:mx-4 md:my-8 md:h-auto md:w-0.5 lg:mx-8 lg:my-4 lg:h-0.5 lg:w-auto"
		></div>
		<!-- Notices -->
		<div class="flex flex-col md:flex-1 lg:flex-0">
			<h3 class="self-center font-[Playfair] text-3xl wrap-anywhere text-[#37543a] lg:text-4xl">
				Notices
			</h3>
			<div class="flex flex-row">
				<div class="flex flex-1 flex-col">
					<h4 class="self-center font-[Playfair] text-xl text-[#132d23] lg:text-2xl">JUNIORS</h4>
				</div>
				<!-- Vertical Divider -->
				<div class="mx-4 my-8 flex min-h-8 w-0.5 rounded-xs bg-[#E0E0E0]"></div>
				<div class="flex flex-1 flex-col">
					<h4 class="self-center font-[Playfair] text-xl text-[#132d23] lg:text-2xl">SENIORS</h4>
				</div>
			</div>
		</div>
	</div>
</div>

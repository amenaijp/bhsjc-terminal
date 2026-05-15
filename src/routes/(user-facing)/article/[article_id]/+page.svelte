<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.article_id}</title>
</svelte:head>

<!-- Divider -->
<div class="my-4 flex h-0.5 rounded-xs bg-[#132d23]"></div>

<!-- top articles -->
<article class="mt-4 flex max-w-[1100px] flex-col self-center md:px-3">
	<!-- Title, Date, Journalists -->
	<header class="flex flex-col self-center px-3 md:max-w-[600px] lg:max-w-[800px]">
		<h2
			class="self-center text-left font-[Playfair] text-4xl wrap-anywhere md:text-5xl lg:text-6xl"
		>
			a VERY interesting article title
		</h2>
		<div class="flex flex-row">
			<p class="md:text-md mt-3 self-center text-left text-sm text-[#666666]">67 days ago</p>
			<div class="flex flex-1"></div>
			<p class="md:text-md mt-3 self-center text-left text-sm">
				<span class="text-[#666666]">Genre:</span>
				<a class="hover:underline" href="#">Bikini Bottom</a>
			</p>
		</div>
		<p class="md:text-md mt-3 text-left text-sm wrap-anywhere">
			by <b class="text-md text-[#132d23] md:text-lg">Squidward Tentacles</b> and
			<b class="text-md wrap-anywhere text-[#132d23] md:text-lg">Spongebob SquarePants</b>
		</p>
	</header>
	<img
		alt="Article Image"
		class="mt-10 flex aspect-video self-center md:rounded-xs md:px-5"
		src="https://picsum.photos/1920/1080"
	/>
	<!-- Actual article content: needs to be treated as dangerous and since it's being parsed through a markdown->html converter it will have slightly different html semantics compared to the rest of the file-->
	<div class="flex flex-col self-center px-3 md:max-w-[600px] lg:max-w-[800px]">
		<!-- whitespace-pre-wrap is just to get \n\n to render while using lorem ipsum, remove when using markdown-->
		<p class="text-left font-[Playfair] text-lg wrap-anywhere whitespace-pre-line md:text-xl">
			Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
			pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
			sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
			massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
			sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
			consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
			cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
			vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
			integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
			per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
			Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus
			duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
			nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
			hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
			inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
			ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
			Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
			egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel
			class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
			ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
			pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
			sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
			massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
			sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
			consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
			cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
			vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
			integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
			per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
			Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus
			duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
			nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
			hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
			inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
			ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis.
			Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
			egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel
			class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
			ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
			pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
			sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
			massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
			sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
			consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
			cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
			vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
			integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
			per conubia nostra inceptos himenaeos.
		</p>
	</div>
</article>

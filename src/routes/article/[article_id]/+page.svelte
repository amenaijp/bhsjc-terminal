<script lang="ts">
    export let data;
</script>

<svelte:head>
    <title>{data.article_id}</title>
</svelte:head>

<!-- Divider -->
<div class="bg-[#132d23] flex h-0.5 my-4 rounded-xs"></div>

<!-- top articles -->
<article class="flex flex-col mt-4 md:px-3 max-w-[1100px] self-center">
    <!-- Title, Date, Journalists -->
    <header class="flex flex-col md:max-w-[600px] lg:max-w-[800px] self-center px-3">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-[Playfair] text-left self-center wrap-anywhere">a VERY
            interesting article title</h2>
        <div class="flex flex-row">
            <p class="text-sm md:text-md text-left text-[#666666] mt-3 self-center">67 days ago</p>
            <div class="flex flex-1"></div>
            <p class="text-sm md:text-md text-left mt-3 self-center"><span class="text-[#666666]">Genre:</span> <a
                    class="hover:underline" href="#">Bikini Bottom</a></p>
        </div>
        <p class="text-sm md:text-md text-left wrap-anywhere mt-3">by <b
                class="text-md md:text-lg text-[#132d23]">Squidward Tentacles</b> and <b
                class="text-md md:text-lg text-[#132d23] wrap-anywhere">Spongebob SquarePants</b></p>
    </header>
    <img alt="Article Image" class="flex aspect-video md:rounded-xs mt-10 self-center md:px-5"
         src="https://picsum.photos/1920/1080"/>
    <!-- Actual article content: needs to be treated as dangerous and since it's being parsed through a markdown->html converter it will have slightly different html semantics compared to the rest of the file-->
    <div class="flex flex-col px-3 md:max-w-[600px] lg:max-w-[800px] self-center">
        <!-- whitespace-pre-wrap is just to get \n\n to render while using lorem ipsum, remove when using markdown-->
        <p class="text-lg md:text-xl text-left wrap-anywhere font-[Playfair] whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.

            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
            sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
            integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
            conubia nostra inceptos himenaeos.
        </p>
    </div>
</article>

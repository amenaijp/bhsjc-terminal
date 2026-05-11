<svelte:head>
    <title>Terminal</title>
</svelte:head>

<!-- genre selector -->
<nav class="hidden md:flex flex-row justify-center">
    <div class="flex flex-1 md:max-w-36 lg:max-w-48 justify-center">
        <a class="flex group px-4" href="#">
            <h2 class="md:text-3xl lg:text-4xl font-[Playfair] text-[#132d23] group-hover:underline">Sport</h2>
        </a>
    </div>
    <div class="flex flex-1 md:max-w-36 lg:max-w-48 justify-center">
        <a class="flex group px-4" href="#">
            <h2 class="md:text-3xl lg:text-4xl font-[Playfair] text-[#132d23] group-hover:underline">Cultural</h2>
        </a>
    </div>
    <div class="flex flex-1 md:max-w-36 lg:max-w-48 justify-center">
        <a class="flex group px-4" href="#">
            <h2 class="md:text-3xl lg:text-4xl font-[Playfair] text-[#132d23] group-hover:underline">Opinion</h2>
        </a>
    </div>
    <div class="flex flex-1 md:max-w-36 lg:max-w-48 justify-center">
        <a class="flex group px-4" href="#">
            <h2 class="md:text-3xl lg:text-4xl font-[Playfair] text-[#132d23] group-hover:underline">School</h2>
        </a>
    </div>
    <div class="flex flex-1 md:max-w-36 lg:max-w-48 justify-center">
        <a class="flex group px-4" href="#">
            <h2 class="md:text-3xl lg:text-4xl font-[Playfair] text-[#132d23] group-hover:underline">Other</h2>
        </a>
    </div>
</nav>

<!-- top articles -->
<div class="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-2 mt-4 md:px-3 max-w-384 self-center">
    <!-- Main article, very side article-->
    <div class="flex flex-col md:col-start-3 md:col-span-4 lg:col-start-2 lg:col-span-2">
        <!-- Main Article -->
        <a class="group flex flex-col"
           href="#">
            <!-- FIXME: if we ever add a dark mode, the opacity trick won't work here-->
            <img alt="Front page"
                 class="flex aspect-video md:rounded-xs group-hover:opacity-90 transition-opacity duration-200"
                 src="https://picsum.photos/1920/1080"/>
            <h2 class="text-4xl lg:text-5xl font-[Playfair] self-center mt-2 wrap-anywhere group-hover:underline">
                Article
                Title</h2>
            <p class="font-[Playfair] text-md md:text-lg self-center mt-1 text-center mx-4 text-[#132d23] wrap-anywhere">
                blah blah blah blah
                blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                blah
                blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                blah</p>
        </a>
        <!-- Divider -->
        <div class="bg-[#E0E0E0] flex h-0.5 mx-8 my-4 rounded-xs"></div>
        <!-- Very Side Article -->
        <a class="group flex justify-center" href="#">
            <h4 class="font-[Playfair] text-2xl lg:text-3xl wrap-anywhere group-hover:underline">Another
                random
                article</h4>
        </a>
    </div>

    <!-- Mobile divider between main article and side articles -->
    <div class="bg-[#E0E0E0] md:hidden flex h-0.5 mx-8 my-4 rounded-xs"></div>

    <!-- Side Articles -->
    <div class="flex flex-col md:col-start-1 md:row-start-1 md:col-span-2 lg:col-span-1 md:mt-6 px-2">
        <!-- Side Article 1 -->
        <a class="group flex flex-col" href="#">
            <h3 class="self-center font-[Playfair] text-2xl lg:text-3xl text-[#37543a] wrap-anywhere group-hover:underline">
                Side
                Article 1</h3>
            <p class="font-[Playfair] self-center text-center text-base md:text-lg text-[#132d23] wrap-anywhere">
                Here is a brief overview of the
                article in a few short sentences</p>
        </a>
        <!-- Divider -->
        <div class="bg-[#E0E0E0] flex h-0.5 mx-8 my-4 rounded-xs"></div>
        <!-- Side Article 2 -->
        <a class="group flex flex-col" href="#">
            <h3 class="self-center font-[Playfair] text-2xl lg:text-3xl text-[#37543a] wrap-anywhere group-hover:underline">
                Side
                Article 2</h3>
            <p class="font-[Playfair] self-center text-center text-base md:text-lg text-[#132d23] wrap-anywhere">
                Here is a brief overview of the
                article in a few short sentences. However, this is a longer article with possibly a photo, so right
                now
                there are a bunch of random words that are just here.</p>
        </a>
        <!-- Divider -->
        <div class="bg-[#E0E0E0] flex h-0.5 mx-8 my-4 rounded-xs"></div>
        <!-- Side Article 3 -->
        <a class="group flex flex-col" href="#">
            <h3 class="self-center font-[Playfair] text-2xl lg:text-3xl text-[#37543a] wrap-anywhere group-hover:underline">
                Side
                Article 3</h3>
            <p class="font-[Playfair] self-center text-center text-base md:text-lg text-[#132d23] wrap-anywhere">
                Here is the last one where its
                very tiny and small bean </p>
        </a>
    </div>

    <!-- Mobile divider between side articles and join us -->
    <div class="bg-[#E0E0E0] md:hidden flex h-0.5 mx-8 my-4 rounded-xs"></div>

    <!-- "Join us", notices-->
    <div class="flex flex-col md:flex-row lg:flex-col md:col-start-1 md:row-start-2 md:col-span-6 lg:col-start-4 lg:row-start-1 lg:col-span-1 px-2 md:mt-6 lg:mt-0">
        <!-- "JOIN US"-->
        <div class="flex md:flex-1 lg:flex-0 flex-col md:mt-6">
            <h2 class="text-4xl lg:text-5xl font-[Playfair] self-center bg-[#37543a] text-[#FFFFFF] p-2 rounded-xs mb-2">
                JOIN US</h2>
            <p class="font-[Playfair] text-md md:text-lg self-center text-center text-[#132d23] wrap-anywhere">
                Meetings are every Friday at lunchtime in B3, come along if you're interested!!! Or get in contact:
                journalismclub@burnside.school.nz</p>
        </div>
        <!-- Vertical/Horizontal Divider -->
        <div class="bg-[#E0E0E0] flex h-0.5 md:h-auto md:w-0.5 lg:h-0.5 lg:w-auto mx-8 my-4 md:mx-4 md:my-8 lg:mx-8 lg:my-4 rounded-xs"></div>
        <!-- Notices -->
        <div class="flex md:flex-1 lg:flex-0 flex-col">
            <h3 class="self-center font-[Playfair] text-3xl lg:text-4xl text-[#37543a] wrap-anywhere">
                Notices</h3>
            <div class="flex flex-row">
                <div class="flex flex-col flex-1">
                    <h4 class="font-[Playfair] text-xl lg:text-2xl self-center text-[#132d23]">JUNIORS</h4>
                </div>
                <!-- Vertical Divider -->
                <div class="bg-[#E0E0E0] flex w-0.5 mx-4 my-8 min-h-8 rounded-xs"></div>
                <div class="flex flex-col flex-1">
                    <h4 class="font-[Playfair] text-xl lg:text-2xl self-center text-[#132d23]">SENIORS</h4>
                </div>
            </div>
        </div>
    </div>
</div>
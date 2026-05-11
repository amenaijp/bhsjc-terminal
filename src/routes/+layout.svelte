<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<div class="flex flex-col min-h-dvh">
	<!-- page header, hamburger menu-->
	<header class="grid grid-cols-[minmax(min-content,1fr)_minmax(min-content,1fr)_1fr]">
		<!-- First column; hamburger menu -->
		<div class="flex items-center">
			<!-- Hamburger menu icon -->
			<button class="flex hover:cursor-pointer">
				<svg class="size-10 md:size-11 lg:size-14 ml-4" fill="none"
					 stroke="currentColor" stroke-width="1" viewBox="0 0 24 24"
					 xmlns="http://www.w3.org/2000/svg">
					<path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round"
						  stroke-linejoin="round"/>
				</svg>
			</button>
		</div>
		<!-- second column; title -->
		<div class="flex flex-row justify-center">
			<a class="flex group px-4" href="#">
				<h1 class="text-5xl md:text-7xl lg:text-8xl my-2 font-[Playfair_Display_SC] text-[#003227] group-hover:underline">
					Terminal</h1>
			</a>
		</div>
		<!-- third column; empty for spacing -->
		<div></div>
	</header>

	{@render children()}

	<!-- Expander, to put the page footer at the very bottom -->
	<div class="flex min-h-32"></div>
</div>

<!-- Page Footer -->
<footer class="flex flex-col md:flex-row justify-center px-8 py-16 gap-4 md:gap-8 bg-[#f8f8f8]">
	<h2 class="text-3xl text-gray-500 self-center">The Burnside Journalism Club</h2>
	<div class="flex flex-col justify-left">
		<p class="text-gray-500 wrap-anywhere">Contact us at <a class="text-blue-500 underline hover:text-blue-700"
																href="mailto:journalismclub@burnside.school.nz">journalismclub@burnside.school.nz</a>
		</p>
		<p class="text-gray-500 self-end">Website by Miles McGrath</p>
	</div>
</footer>

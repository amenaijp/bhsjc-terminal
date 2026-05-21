<script lang="ts">
	import type { PageData } from './$types';
	import { GENRES } from '$lib/genres';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-8">
	<!--	info-->
	<div class="flex flex-col">
		<div class="flex flex-row items-center">
			<div class="mx-2 h-12 w-12 bg-gray-300"></div>
			<p>Unselectable</p>
		</div>
		<div class="flex flex-row items-center">
			<div class="mx-2 h-12 w-12 bg-green-300"></div>
			<p>auto</p>
		</div>
		<div class="flex flex-row items-center">
			<div class="mx-2 h-12 w-12 bg-blue-300"></div>
			<p>already pinned</p>
		</div>
	</div>

	<!--	front page -->
	<div class="flex flex-col">
		<p>Front page:</p>
		<div class="grid h-120 w-240 grid-cols-4 gap-1">
			<!-- side articles -->
			<div class="col-span-1 col-start-1 flex flex-col gap-1">
				<div class="flex flex-1 flex-col bg-green-300">side 1</div>
				<div class="flex flex-1 flex-col bg-green-300">side 2</div>
				<div class="flex flex-1 flex-col bg-green-300">side 3</div>
			</div>
			<!-- main, very side -->
			<div class="col-span-2 col-start-2 flex flex-col gap-1">
				<div class="flex flex-5 flex-col bg-green-300">main 1</div>
				<div class="flex flex-1 flex-col bg-green-300">very side 1</div>
			</div>
			<!-- notices, join us -->
			<div class="col-span-1 col-start-4 flex flex-col gap-1">
				<div class="flex flex-1 flex-col bg-red-300">JOIN US</div>
				<div class="flex flex-1 flex-col bg-red-300">notices</div>
			</div>
		</div>
	</div>

	<!-- genre pages -->
	{#each GENRES as genre}
		<div class="flex flex-col">
			<p>{genre}:</p>
			<div class="grid h-97.5 w-195 grid-cols-4 gap-1">
				<!-- main, very side -->
				<div class="col-start-1 col-span-2 flex flex-col gap-1">
					<div class="flex flex-1 flex-col bg-green-300">main 1</div>
				</div>
				<!-- side articles 1 -->
				<div class="col-start-3 col-span-1 flex flex-col gap-1">
					<div class="flex flex-1 flex-col bg-green-300">side 1</div>
					<div class="flex flex-1 flex-col bg-green-300">side 2</div>
					<div class="flex flex-1 flex-col bg-green-300">side 3</div>
				</div>
				<!-- side articles 2 -->
				<div class="col-start-4 col-span-1 flex flex-col gap-1">
					<div class="flex flex-1 flex-col bg-green-300">side 4</div>
					<div class="flex flex-1 flex-col bg-green-300">side 5</div>
					<div class="flex flex-1 flex-col bg-green-300">side 6</div>
				</div>
			</div>
		</div>
	{/each}
</div>

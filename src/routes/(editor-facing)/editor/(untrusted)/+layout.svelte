<script lang="ts">
	let { children } = $props();
</script>

<div class="m-2 flex flex-col">
	{@render children()}
</div>

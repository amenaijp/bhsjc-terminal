<script lang="ts">
	let { children } = $props();
</script>

<div class="flex flex-col m-2">
	{@render children()}
</div>

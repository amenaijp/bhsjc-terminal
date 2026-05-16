<script lang="ts">
	import { resolve } from "$app/paths"
</script>

<div class="flex flex-col m-2">
	<p>
		You've successfully made your Terminal account! Make sure a club admin knows that you're waiting to be verified, then sit tight.
		<br />
		In the meantime, have you verified your email address yet? We may assume you're a bot or malicious actor if you haven't.
	</p>

	<a href={resolve("/")} class="text-blue-600 hover:text-blue-600 hover:underline mx-2 w-fit">return to homepage</a>
</div>

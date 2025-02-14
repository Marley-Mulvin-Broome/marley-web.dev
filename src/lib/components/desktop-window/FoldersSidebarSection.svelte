<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
	}

	let { title, children }: Props = $props();
</script>

<div>
	<p class="text-lg text-gray-400 mb-4 px-4">{title}</p>
	<div class="flex flex-col">
		{@render children()}
	</div>
</div>

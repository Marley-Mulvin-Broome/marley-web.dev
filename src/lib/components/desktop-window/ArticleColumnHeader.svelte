<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
	}

	let { children, class: classes = '' }: Props = $props();
</script>

<button class={'text-left text-gray-400 ' + classes}>
	{@render children()}
</button>

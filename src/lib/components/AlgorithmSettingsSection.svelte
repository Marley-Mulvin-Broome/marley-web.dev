<script lang="ts">
	import type { HeadingTag } from '$lib/types';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: Snippet;
		children?: Snippet;
	}

	const { title, children }: Props = $props();
</script>

<div class="flex flex-col border border-gray-600 rounded-lg p-4 relative">
	<h3
		class="text-xl font-bold text-accent w-fit bg-primary absolute -top-1/2 translate-y-1/2 left-3 px-1"
	>
		{@render title?.()}
	</h3>

	{@render children?.()}
</div>

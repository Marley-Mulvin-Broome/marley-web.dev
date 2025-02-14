<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface Props extends HTMLLabelAttributes {
		children?: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<label class="text-gray-400 text-sm font-semibold" {...props}>
	{@render children?.()}
</label>

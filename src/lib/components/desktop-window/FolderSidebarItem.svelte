<script lang="ts">
	import type { SupportedIcons } from '$lib/types';
	import type { Snippet } from 'svelte';
	import Icon from '../Icon.svelte';

	interface Props {
		icon: SupportedIcons;
		href: string;
		children: Snippet;
	}

	let { icon, href, children }: Props = $props();

	let height = $derived(icon === 'file' ? 25 : 30);
	let width = $derived(icon === 'file' ? 25 : 30);
</script>

<a {href} class="hover:bg-gray-600 w-full px-4 py-2">
	<div class="flex flex-row gap-2 items-center">
		<Icon
			icon="/icons/{icon}.svg"
			class=" text-accent"
			{width}
			{height}
			overwriteDimensions={true}
		/>
		<p class="text-base mt-[2px]">
			{@render children()}
		</p>
	</div>
</a>

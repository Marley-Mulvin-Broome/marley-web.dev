<script lang="ts">
	import DesktopWindow from '$lib/components/desktop-window/DesktopWindow.svelte';
	import FoldersSidebar from '$lib/components/desktop-window/FoldersSidebar.svelte';
	import { windows } from '$lib/windows.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	let innerWidth = $state(0);

	onMount(() => {
		if (innerWidth < 1024) windows.fullscreen = true;
	});
</script>

<svelte:window bind:innerWidth />

<DesktopWindow x={100} y={100} bind:fullscreen={windows.fullscreen} breadcrums={windows.breadcrums}>
	{#snippet sidebar()}
		<FoldersSidebar />
	{/snippet}

	<div class="lg:w-[800px]">
		{@render children()}
	</div>
</DesktopWindow>

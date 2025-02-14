<script>
	import DesktopWindow from '$lib/components/desktop-window/DesktopWindow.svelte';
	import FoldersSidebar from '$lib/components/desktop-window/FoldersSidebar.svelte';
</script>

<DesktopWindow x={100} y={100} breadcrums={[{ title: 'Error' }]}>
	{#snippet sidebar()}
		<FoldersSidebar />
	{/snippet}

	<div class="flex flex-col items-center justify-center h-full px-20">
		<h1 class="text-3xl font-bold">Oops, something went wrong!</h1>
		<p class="text-lg">Please try again later.</p>
	</div>
</DesktopWindow>

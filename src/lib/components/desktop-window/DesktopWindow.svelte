<script lang="ts">
	import type { Snippet } from 'svelte';
	import DesktopWindowTitlebarControls from './DesktopWindowTitlebarControls.svelte';
	import WindowBreadcrums from './WindowBreadcrums.svelte';
	import type { Breadcrum } from '$lib/types';

	interface Props {
		fullscreen?: boolean;
		children: Snippet;
		sidebar?: Snippet;
		breadcrums?: Breadcrum[];
		x: number;
		y: number;
	}

	let {
		fullscreen = $bindable(false),
		children,
		x = $bindable(),
		y = $bindable(),
		sidebar,
		breadcrums = []
	}: Props = $props();
</script>

<div
	class="absolute left-[--x] top-[--y] bg-primary-light border-gray-600 border rounded-md flex flex-row data-[fullscreen=true]:left-0 data-[fullscreen=true]:top-0 data-[fullscreen=true]:h-full data-[fullscreen=true]:w-full data-[fullscreen=true]:rounded-none data-[fullscreen=true]:border-none overflow-clip transition-size"
	style:--x={x}
	style:--y={y}
	data-fullscreen={fullscreen}
>
	<div class="hidden lg:flex flex-col w-[200px] items-start border-r border-gray-600">
		<DesktopWindowTitlebarControls onmaximize={() => (fullscreen = !fullscreen)} />

		{@render sidebar?.()}
	</div>

	<div class="flex flex-col flex-1 overflow-y-scroll lg:max-h-[600px] bg-primary">
		<div class="w-full px-4 py-2 border-b border-gray-600 bg-primary-light">
			<WindowBreadcrums {breadcrums} />
		</div>

		<div class="bg-primary px-4 py-2 flex-1 max-h-full self-center">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.transition-size {
		transition:
			width 0.2s ease-in-out,
			height 0.2s ease-in-out;
	}
</style>

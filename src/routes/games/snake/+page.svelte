<script lang="ts">
	import { startSnake } from '$lib/games/snake';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let canvas: HTMLCanvasElement;

	const score = writable(0);

	onMount(() => {
		const cleanup = startSnake(canvas, score);

		return () => {
			cleanup();
		};
	});
</script>

<div
	class="absolute top-0 left-0 w-full h-full bg-black flex flex-col justify-center items-center z-10"
>
	<h1 class="text-3xl font-bold mb-2">
		{$score}
	</h1>

	<canvas width="800" height="400" bind:this={canvas}></canvas>
</div>

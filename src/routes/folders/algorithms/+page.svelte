<script lang="ts">
	import { breadcrums } from '$lib';
	import Meta from '$lib/components/Meta.svelte';
	import ForceGraph from '$lib/graph/ForceGraph';
	import type { ForceGraphSettings } from '$lib/graph/graph.types';
	import { createRandomGraph } from '$lib/graph/graph.util';
	import GraphVisualiser from '$lib/graph/GraphVisualiser';
	import { copyArray } from '$lib/utility';
	import { randomInt, shuffleArray } from '$lib/utility/mathUtil';
	import { windows } from '$lib/windows.svelte';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	let forceGraph: ForceGraph;
	let graph: GraphVisualiser;

	const simulationSettings: Partial<ForceGraphSettings> = {
		damping: 0.5,
		repulsionStrength: 5,
		attractionStrength: 0.1,
		springLength: 20
	};

	const randomiseGraph = (
		minNodes: number,
		maxNodes: number,
		minEdges: number,
		maxEdges: number,
		connected: boolean = true
	) => {
		const { nodes, edges } = createRandomGraph(minNodes, maxNodes, minEdges, maxEdges, connected);

		forceGraph = new ForceGraph(nodes, edges, simulationSettings);
	};

	onMount(() => {
		windows.breadcrums = breadcrums.algorithms;

		windows.fullscreen = true;

		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('Failed to get canvas context');
		}

		randomiseGraph(4, 10, 3, 23);

		graph = new GraphVisualiser(ctx, forceGraph, {
			backgroundColor: '#FFF',
			node: {
				fillColor: '#FFF',
				outline: {
					color: '#000',
					width: 1
				},
				label: {
					fontColor: '#000',
					fontSize: 5
				}
			},
			edge: {}
		});

		return graph.start();
	});
</script>

<Meta
	title="Graph Algorithm Visualiser - DFS, BFS, Dijkstra, A*, and more."
	description="Visualise graph algorithms like DFS, BFS, Dijkstra, A*, and more."
/>

<article class="w-full h-full">
	<h1 class="text-3xl font-bold my-4 text-center">Graph Algorithms</h1>

	<div class="relative">
		<canvas class="w-full h-full object-contain rounded" bind:this={canvas}></canvas>

		<div class="absolute top-0 left-0 w-full h-full pointer-events-none">
			<div
				class="absolute right-4 top-4 flex flex-col text-accent bg-primary-light font-bold rounded-md overflow-clip pointer-events-auto"
			>
				{#snippet zoomButton(text: string, factor: number)}
					<button
						class="text-accent p-2 hover:bg-gray-600"
						on:click={() => {
							graph.zoom(factor);
						}}
					>
						{text}
					</button>
				{/snippet}

				{@render zoomButton('+', 1.2)}
				{@render zoomButton('-', 0.8)}
			</div>
		</div>
	</div>

	<div>
		<h2>Settings</h2>
	</div>
</article>

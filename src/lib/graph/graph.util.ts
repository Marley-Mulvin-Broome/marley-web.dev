import { randomInt, shuffleArray } from '$lib/utility';

/**
 * Creates a random graph with specified parameters
 * @param minNodes Minimum number of nodes
 * @param maxNodes Maximum number of nodes
 * @param minEdges Minimum number of edges
 * @param maxEdges Maximum number of edges
 * @param connected Whether the graph should be connected
 * @param simulationSettings Settings for the force graph
 * @returns A new ForceGraph instance
 */
export const createRandomGraph = (
	minNodes: number,
	maxNodes: number,
	minEdges: number,
	maxEdges: number,
	connected: boolean = true
) => {
	// Generate random node count
	const nodeCount = randomInt(minNodes, maxNodes);

	// Create nodes
	const nodesArray = Array.from({ length: nodeCount }, (_, i) => ({
		id: `${i}`,
		label: `Node ${i}`
	}));

	// Calculate maximum possible edges
	const maxPossibleEdges = (nodeCount * (nodeCount - 1)) / 2;

	// Adjust edge count to be within bounds
	let edgeCount = Math.min(randomInt(minEdges, maxEdges), maxPossibleEdges);
	const edgesArray = [];

	// For connected graphs, create a spanning tree first
	if (connected && nodeCount > 1) {
		// Use Fisher-Yates shuffle to create random spanning tree
		const shuffledNodes = shuffleArray([...nodesArray]);

		// Create spanning tree (n-1 edges)
		for (let i = 1; i < shuffledNodes.length; i++) {
			edgesArray.push({
				source: shuffledNodes[i - 1].id,
				target: shuffledNodes[i].id
			});
		}

		// Adjust remaining edges to add
		edgeCount = Math.max(0, edgeCount - (nodeCount - 1));
	}

	// Track existing edges to avoid duplicates
	const edgeSet = new Set(edgesArray.map((e) => `${e.source}-${e.target}`));

	// Add remaining random edges
	let attempts = 0;
	const maxAttempts = edgeCount * 3; // Avoid infinite loop

	while (
		edgesArray.length < (connected ? nodeCount - 1 + edgeCount : edgeCount) &&
		attempts < maxAttempts
	) {
		const source = randomInt(0, nodeCount - 1).toString();
		const target = randomInt(0, nodeCount - 1).toString();

		// Prevent self-loops
		if (source === target) {
			attempts++;
			continue;
		}

		// Check for duplicate edges (in both directions for undirected graph)
		const edgeKey1 = `${source}-${target}`;
		const edgeKey2 = `${target}-${source}`;

		if (!edgeSet.has(edgeKey1) && !edgeSet.has(edgeKey2)) {
			edgesArray.push({ source, target });
			edgeSet.add(edgeKey1);
		}

		attempts++;
	}

	return {
		nodes: nodesArray,
		edges: edgesArray
	};
};

import type { BaseNode, Edge, Node, ForceGraphSettings } from './graph.types';

export default class ForceGraph {
	nodes: Node[];
	edges: Edge[];

	settings: ForceGraphSettings = {
		repulsionStrength: 100,
		attractionStrength: 0.1,
		springLength: 10,
		springStiffness: 0.1,
		damping: 0.9
	};

	constructor(nodes: BaseNode[], edges: Edge[], settings?: Partial<ForceGraphSettings>) {
		this.nodes = nodes.map((node) => ({
			...node,
			x: 1000 * Math.random(),
			y: 1000 * Math.random(),
			vx: 0,
			vy: 0,
			fx: 0,
			fy: 0
		}));

		this.edges = edges;

		if (settings) {
			this.settings = { ...this.settings, ...settings };
		}
	}

	tick() {
		const { repulsionStrength, attractionStrength, springLength, damping } = this.settings;

		for (const node of this.nodes) {
			node.fx = 0;
			node.fy = 0;
		}

		for (const node of this.nodes) {
			for (const otherNode of this.nodes) {
				if (node === otherNode) continue;

				const dx = node.x - otherNode.x;
				const dy = node.y - otherNode.y;
				const distSq = dx * dx + dy * dy;
				const distance = Math.sqrt(distSq) + 0.01;

				const force = repulsionStrength / distSq;
				const fx = (dx / distance) * force;
				const fy = (dy / distance) * force;
				node.fx += fx;
				node.fy += fy;
				otherNode.fx -= fx;
				otherNode.fy -= fy;
			}
		}

		// Attraction forces
		for (const edge of this.edges) {
			const sourceNode = this.nodes.find((node) => node.id === edge.source);
			const targetNode = this.nodes.find((node) => node.id === edge.target);

			if (sourceNode && targetNode) {
				const dx = sourceNode.x - targetNode.x;
				const dy = sourceNode.y - targetNode.y;
				const distSq = dx * dx + dy * dy;
				const distance = Math.sqrt(distSq) || 1;

				const force = attractionStrength * (distance - springLength);
				const fx = (dx / distance) * force;
				const fy = (dy / distance) * force;
				sourceNode.fx -= fx;
				sourceNode.fy -= fy;
				targetNode.fx += fx;
				targetNode.fy += fy;
			}
		}

		for (const node of this.nodes) {
			node.vx += node.fx;
			node.vy += node.fy;

			// Apply damping
			node.vx *= damping;
			node.vy *= damping;

			// Update position
			node.x += node.vx;
			node.y += node.vy;

			// Constrain to bounds if specified
			if (this.settings.bounds) {
				const { x, y, width, height } = this.settings.bounds;
				node.x = Math.max(x, Math.min(node.x, x + width));
				node.y = Math.max(y, Math.min(node.y, y + height));
			}
		}
	}
}

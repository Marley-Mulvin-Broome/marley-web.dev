import type ForceGraph from './ForceGraph';
import type { GraphVisualiserSettings, GraphVisualiserSettingsPartial, Node } from './graph.types';
import { dfs } from './graph.util';

class CanvasCamera {
	x: number;
	y: number;
	private currentZoom: number;
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;

	// Zoom constraints
	private MAX_ZOOM = 5;
	private MIN_ZOOM = 0.01;

	constructor(canvas: HTMLCanvasElement, x: number, y: number, zoom: number) {
		this.x = x;
		this.y = y;
		this.canvas = canvas;
		this.currentZoom = zoom;

		this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
	}

	get zoom() {
		return this.currentZoom;
	}

	set zoom(value: number) {
		this.currentZoom = Math.min(this.MAX_ZOOM, Math.max(this.MIN_ZOOM, value));
	}

	focusOn(x: number, y: number, zoom = this.currentZoom) {
		this.x = x;
		this.y = y;
		this.currentZoom = zoom;
		this.reset();
		this.apply();
	}

	apply() {
		const canvas = this.canvas;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		// Move to canvas center
		this.context.translate(centerX, centerY);
		// Apply zoom
		this.context.scale(this.currentZoom, this.currentZoom);
		// Move based on offset
		this.context.translate(this.x, this.y);
	}

	reset() {
		this.context.setTransform(
			window.devicePixelRatio || 1,
			0,
			0,
			window.devicePixelRatio || 1,
			0,
			0
		);
	}

	isVisible(x: number, y: number) {
		const canvas = this.canvas;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		// Check if the point is within the visible area
		return (
			x >= (this.x - centerX) / this.currentZoom &&
			x <= (this.x + centerX) / this.currentZoom &&
			y >= (this.y - centerY) / this.currentZoom &&
			y <= (this.y + centerY) / this.currentZoom
		);
	}

	doZoom(factor: number) {
		this.currentZoom = Math.min(this.MAX_ZOOM, Math.max(this.MIN_ZOOM, this.currentZoom * factor));
	}
}

class CanvasControls {
	private isDragging = false;
	private dragStart = { x: 0, y: 0 };
	private lastOffset = { x: 0, y: 0 };
	private SCROLL_SENSITIVITY = 0.0005;

	constructor(
		private canvas: HTMLCanvasElement,
		private camera: CanvasCamera
	) {
		this.canvas = canvas;
		this.camera = camera;
	}

	attachListeners() {
		this.canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
		this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
		this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
		this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));

		return () => {
			this.canvas.removeEventListener('wheel', this.handleWheel.bind(this));
			this.canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
			this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
			this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
		};
	}

	private handleWheel(event: WheelEvent) {
		event.preventDefault();
		this.camera.zoom = this.camera.zoom - event.deltaY * this.SCROLL_SENSITIVITY * this.camera.zoom;
	}

	private handleMouseDown(event: MouseEvent) {
		this.isDragging = true;
		this.dragStart.x = event.clientX;
		this.dragStart.y = event.clientY;
		this.lastOffset = { x: this.camera.x, y: this.camera.y };
		this.canvas.style.cursor = 'grabbing';
	}

	private handleMouseMove(event: MouseEvent) {
		if (!this.isDragging) return;

		const dx = event.clientX - this.dragStart.x;
		const dy = event.clientY - this.dragStart.y;

		this.camera.x = this.lastOffset.x + dx / this.camera.zoom;
		this.camera.y = this.lastOffset.y + dy / this.camera.zoom;
	}

	private handleMouseUp() {
		this.isDragging = false;
		this.canvas.style.cursor = 'grab';
	}
}

export default class GraphVisualiser {
	context: CanvasRenderingContext2D;
	simulation: ForceGraph;
	settings: GraphVisualiserSettings = {
		node: {
			radius: 5,
			outline: {
				color: 'black',
				width: 1,
				visibility: true
			},
			fillColor: 'blue',
			label: {
				fontSize: 12,
				fontFamily: 'Arial',
				fontColor: 'black',
				fontWeight: 'normal',
				visibility: true
			}
		},
		edge: {
			width: 1,
			color: 'gray',
			visibility: true
		},
		backgroundColor: 'white'
	};
	private isRunning: boolean = false;

	private controls: CanvasControls;
	camera: CanvasCamera;

	private islands: Node[][] = [];

	constructor(
		context: CanvasRenderingContext2D,
		simulation: ForceGraph,
		settings?: GraphVisualiserSettingsPartial
	) {
		this.context = context;
		this.simulation = simulation;
		this.camera = new CanvasCamera(
			this.context.canvas,
			this.context.canvas.width / 2,
			this.context.canvas.height / 2,
			3
		);
		this.controls = new CanvasControls(this.context.canvas, this.camera);

		if (settings) {
			this.settings = {
				...this.settings,
				node: {
					...this.settings.node,
					...settings.node,
					label: {
						...this.settings.node.label,
						...settings.node?.label
					},
					outline: {
						...this.settings.node.outline,
						...settings.node?.outline
					}
				},
				edge: {
					...this.settings.edge,
					...settings.edge
				}
			};
		}

		this.populateIslands();
		this.focusOnIsland(this.islands[0]);
	}

	setSimulation(graph: ForceGraph) {
		this.simulation = graph;
		this.populateIslands();
		this.focusOnIsland(this.islands[0]);
	}

	private populateIslands() {
		let nodes = [...this.simulation.nodes];
		const islands: Node[][] = [];

		while (nodes.length > 0) {
			islands.push([]);
			dfs(nodes, this.simulation.edges, nodes[0], (node) => {
				nodes = nodes.filter((n) => n.id !== node.id);

				islands[islands.length - 1].push(node);
			});
		}

		this.islands = islands;
	}

	private isNodeOnScreen(node: Node) {
		return this.camera.isVisible(node.x, node.y);
	}

	private isIslandOnScreen(island: Node[]) {
		return island.some((node) => this.isNodeOnScreen(node));
	}

	private setupHighResolutionCanvas() {
		const canvas = this.context.canvas;

		// Get the display size of the canvas
		const { width, height } = canvas.getBoundingClientRect();

		// Get the device pixel ratio
		const dpr = window.devicePixelRatio || 1;

		// Set the canvas bitmap dimensions to match CSS size × device pixel ratio
		canvas.width = Math.floor(width * dpr);
		canvas.height = Math.floor(height * dpr);

		// Scale all drawing operations by the device pixel ratio
		this.context.scale(dpr, dpr);

		// Set display size (CSS pixels)
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;
	}

	private setupResizeHandler() {
		const resizeObserver = new ResizeObserver(() => {
			this.setupHighResolutionCanvas();
		});

		resizeObserver.observe(this.context.canvas);

		return () => {
			resizeObserver.disconnect();
		};
	}

	private drawNodeLabel(node: Node) {
		this.context.fillStyle = this.settings.node.label.fontColor;
		this.context.font = `${this.settings.node.label.fontWeight} ${this.settings.node.label.fontSize}px ${this.settings.node.label.fontFamily}`;
		this.context.fillText(
			node.label,
			node.x - this.settings.node.radius,
			node.y + this.settings.node.radius * 2
		);
	}

	private drawNode(node: Node) {
		this.context.beginPath();
		this.context.arc(node.x, node.y, this.settings.node.radius, 0, Math.PI * 2);
		this.context.fillStyle = this.settings.node.fillColor;
		this.context.strokeStyle = this.settings.node.outline.color;
		this.context.fill();
		this.context.lineWidth = this.settings.node.outline.width;
		this.context.stroke();
		this.context.closePath();

		if (this.settings.node.label.visibility) {
			this.drawNodeLabel(node);
		}
	}

	private drawEdge(start: Node, end: Node) {
		if (!this.settings.edge.visibility) return;

		this.context.beginPath();
		this.context.moveTo(start.x, start.y);
		this.context.lineTo(end.x, end.y);
		this.context.strokeStyle = this.settings.edge.color;
		this.context.lineWidth = this.settings.edge.width;
		this.context.stroke();
		this.context.closePath();
	}

	private drawIslandIndicator(island: Node[]) {
		// Draw triangle on screen pointing to the direction of the island
		const firstNode = island[0];
		const lastNode = island[island.length - 1];
		const midX = (firstNode.x + lastNode.x) / 2;
		const midY = (firstNode.y + lastNode.y) / 2;
		const angle = Math.atan2(lastNode.y - firstNode.y, lastNode.x - firstNode.x);
		const triangleSize = 10;
		const triangleX = midX + Math.cos(angle) * triangleSize;
		const triangleY = midY + Math.sin(angle) * triangleSize;
		this.context.beginPath();
		this.context.moveTo(midX, midY);
		this.context.lineTo(triangleX, triangleY);
		this.context.lineTo(
			midX - Math.cos(angle) * triangleSize,
			midY - Math.sin(angle) * triangleSize
		);
		this.context.closePath();
		this.context.fillStyle = 'red';
		this.context.fill();
	}

	focusOnIsland(island: Node[]) {
		const firstNode = island[0];
		const lastNode = island[island.length - 1];
		const midX = (firstNode.x + lastNode.x) / 2;
		const midY = (firstNode.y + lastNode.y) / 2;
		this.camera.focusOn(midX, midY);
		this.draw();
	}

	start() {
		if (this.isRunning) return;

		this.setupHighResolutionCanvas();

		const cleanupResize = this.setupResizeHandler();

		this.isRunning = true;
		this.simulation.tick();

		const animate = () => {
			if (this.isRunning) {
				this.draw();
				requestAnimationFrame(animate);
			}
		};
		requestAnimationFrame(animate);

		const cleanupListeners = this.controls.attachListeners();

		return () => {
			this.stop();
			cleanupListeners();
			cleanupResize();
		};
	}

	stop() {
		this.isRunning = false;
	}

	draw() {
		this.simulation.tick();

		this.camera.reset();
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.fillStyle = 'white';
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		this.camera.apply();

		this.simulation.edges.forEach((edge) => {
			const startNode = this.simulation.nodes.find((node) => node.id === edge.source);
			const endNode = this.simulation.nodes.find((node) => node.id === edge.target);
			if (startNode && endNode) {
				this.drawEdge(startNode, endNode);
			}
		});

		this.simulation.nodes.forEach((node) => {
			this.drawNode(node);
		});

		for (const island of this.islands) {
			if (this.isIslandOnScreen(island)) continue;

			this.drawIslandIndicator(island);
		}

		this.camera.reset();
	}
}

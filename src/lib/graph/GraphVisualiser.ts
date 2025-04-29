import type ForceGraph from './ForceGraph';
import type { GraphVisualiserSettings, GraphVisualiserSettingsPartial, Node } from './graph.types';

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

	// Camera properties
	private cameraOffset = { x: 0, y: 0 };
	private cameraZoom = 0.8;
	private isDragging = false;
	private dragStart = { x: 0, y: 0 };
	private lastOffset = { x: 0, y: 0 };

	// Zoom constraints
	private MAX_ZOOM = 5;
	private MIN_ZOOM = 0.01;
	private SCROLL_SENSITIVITY = 0.0005;

	constructor(
		context: CanvasRenderingContext2D,
		simulation: ForceGraph,
		settings?: GraphVisualiserSettingsPartial
	) {
		this.context = context;
		this.simulation = simulation;

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

	private applyCamera() {
		const canvas = this.context.canvas;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		// Move to canvas center
		this.context.translate(centerX, centerY);
		// Apply zoom
		this.context.scale(this.cameraZoom, this.cameraZoom);
		// Move based on offset
		this.context.translate(this.cameraOffset.x, this.cameraOffset.y);
	}

	private resetCamera() {
		this.context.setTransform(
			window.devicePixelRatio || 1,
			0,
			0,
			window.devicePixelRatio || 1,
			0,
			0
		);
	}

	private attachListeners() {
		const canvas = this.context.canvas;

		canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
		canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
		canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
		canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));

		return () => {
			canvas.removeEventListener('wheel', this.handleWheel.bind(this));
			canvas.removeEventListener('mousedown', this.handleMouseDown.bind(this));
			canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
			canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
		};
	}

	private handleWheel(event: WheelEvent) {
		event.preventDefault();
		const zoom = this.cameraZoom - event.deltaY * this.SCROLL_SENSITIVITY * this.cameraZoom;
		this.cameraZoom = Math.min(this.MAX_ZOOM, Math.max(this.MIN_ZOOM, zoom));
	}

	private handleMouseDown(event: MouseEvent) {
		const canvas = this.context.canvas;

		this.isDragging = true;
		this.dragStart.x = event.clientX;
		this.dragStart.y = event.clientY;
		this.lastOffset = { ...this.cameraOffset };
		canvas.style.cursor = 'grabbing';
	}

	private handleMouseMove(event: MouseEvent) {
		if (!this.isDragging) return;

		const dx = event.clientX - this.dragStart.x;
		const dy = event.clientY - this.dragStart.y;

		this.cameraOffset.x = this.lastOffset.x + dx / this.cameraZoom;
		this.cameraOffset.y = this.lastOffset.y + dy / this.cameraZoom;
	}

	private handleMouseUp() {
		this.isDragging = false;
		const canvas = this.context.canvas;
		canvas.style.cursor = 'grab';
	}

	zoom(factor: number) {
		this.cameraZoom = Math.min(this.MAX_ZOOM, Math.max(this.MIN_ZOOM, this.cameraZoom * factor));
	}

	start() {
		if (this.isRunning) return;

		this.setupHighResolutionCanvas();

		const cleanupResize = this.setupResizeHandler();

		this.isRunning = true;
		this.simulation.tick();
		// Center onto first node
		if (this.simulation.nodes.length > 0) {
			const firstNode = this.simulation.nodes[0];
			this.cameraOffset.x = -firstNode.x;
			this.cameraOffset.y = -firstNode.y;
			this.cameraZoom = 1;
		}

		const animate = () => {
			if (this.isRunning) {
				this.draw();
				requestAnimationFrame(animate);
			}
		};
		requestAnimationFrame(animate);

		const cleanupListeners = this.attachListeners();

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

		this.resetCamera();
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.fillStyle = 'white';
		this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

		this.applyCamera();

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

		this.resetCamera();
	}
}

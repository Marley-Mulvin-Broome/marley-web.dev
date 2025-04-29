export interface BaseNode {
	id: string;
	label: string;
}

export interface Edge {
	source: string;
	target: string;
}

export interface Node extends BaseNode {
	x: number;
	y: number;
	vx: number;
	vy: number;
	fx: number;
	fy: number;
}

export interface ForceGraphSettings {
	repulsionStrength: number;
	attractionStrength: number;
	springLength: number;
	springStiffness: number;
	damping: number;
	bounds?: {
		x: number;
		y: number;
		width: number;
		height: number;
	};
}

interface OutlineSettings {
	color: string;
	width: number;
	visibility: boolean;
}

export interface NodeSettings {
	radius: number;
	outline: OutlineSettings;
	fillColor: string;
	label: {
		fontSize: number;
		fontFamily: string;
		fontColor: string;
		fontWeight: string;
		visibility: boolean;
	};
}

export interface EdgeSettings {
	width: number;
	color: string;
	visibility: boolean;
}

export type PartialChildren<T> = {
	[K in keyof T]?: T[K] extends object ? PartialChildren<T[K]> : T[K];
};

export interface GraphVisualiserSettings {
	node: NodeSettings;
	edge: EdgeSettings;
	backgroundColor: string;
}

export type GraphVisualiserSettingsPartial = PartialChildren<GraphVisualiserSettings>;

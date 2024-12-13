import { t } from "$lib/translations";
import type { Writable } from "svelte/store";

interface IPoint {
  x: number;
  y: number;
}

const rand = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);

  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

class Map {
  constructor(public width: number, public height: number, public cellSize: number, private ctx : CanvasRenderingContext2D) { }

  contains(point: IPoint) {
    return point.x >= 0 && point.x < this.width && point.y >= 0 && point.y < this.height;
  }

  draw() {
    this.ctx.fillStyle = "green";

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const canvasPosition = mapPointToCanvasPosition({ x, y }, this.cellSize);

        this.ctx.fillRect(canvasPosition.x, canvasPosition.y, this.cellSize, this.cellSize);
      }
    }
  }
}

class Point implements IPoint {
  constructor(public x: number, public y: number) { }

  add(other: IPoint) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  overlaps(other: IPoint) {
    return this.x === other.x && this.y === other.y;
  }
}

class Food {
  constructor(public position: Point, private map: Map, private ctx: CanvasRenderingContext2D) { }

  draw() {
    this.ctx.fillStyle = "blue";
    const canvasPosition = mapPointToCanvasPosition({ x: this.position.x, y: this.position.y }, this.map.cellSize);
    this.ctx.fillRect(canvasPosition.x, canvasPosition.y, this.map.cellSize, this.map.cellSize);
  }

  reset() {
    this.position = Food.getPosition(this.map);
  }

  static getPosition(map: Map): Point {
    return new Point(rand(0, map.width), rand(0, map.height));
  }
}

class Snake {
  constructor(private points: Point[], private ctx: CanvasRenderingContext2D, private map: Map) { 

  }

  get head() {
    return this.points[0];
  }

  reset() {
    this.points = [new Point(Math.round(this.map.width / 2), Math.round(this.map.height / 2))];
  }

  move(direction: IPoint) {
    this.points.unshift(this.points[0].add(direction));
  }

  pop() {
    this.points.pop();
  }

  draw() {
    this.ctx.fillStyle = "red";

    for (const point of this.points) {
      const canvasPosition = mapPointToCanvasPosition(point, this.map.cellSize);
      this.ctx.fillRect(canvasPosition.x, canvasPosition.y, this.map.cellSize, this.map.cellSize);
    }
  }

  get length() {
    return this.points.length;
  }
}

class Game {
  map: Map;
  snake: Snake;
  food: Food;
  direction: IPoint = { x: 1, y: 0 }; 

  directionQueue: IPoint[] = [];

  alive = true;
  speed = 1000;
  running = true;

  score: Writable<number>;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number, score: Writable<number>) {
    this.map = new Map(width, height, cellSize, ctx);
    this.snake = new Snake([new Point(Math.round(this.map.width / 2), Math.round(this.map.height / 2))], ctx, this.map);
    this.food = new Food(Food.getPosition(this.map), this.map, ctx);

    document.addEventListener("keydown", this.keydownEvent.bind(this));

    this.score = score;
  }

  keydownEvent(event: KeyboardEvent) {
    if (this.directionQueue.length > 2) return;

    this.directionQueue.push(getDirection(event));
  }

  popDirection() {
    this.directionQueue.shift();
  }

  update() {
    if (!this.map.contains(this.snake.head)) {
      this.alive = false;
      return;
    }

    this.direction = this.directionQueue.length > 0 ? this.directionQueue.shift()! : this.direction;

    this.snake.move(this.direction);

    if (this.snake.head.overlaps(this.food.position)) {
      this.food.reset();
      this.score.update(n => n + 1);
    } else {
      this.snake.pop();
    }

    this.speed = Math.max(500 - (this.snake.length * 50) , 50);
  }

  draw() {
    this.map.draw();
    this.snake.draw();
    this.food.draw();
  }

  tick() {
    if (this.alive) {
      this.update();
      this.draw();
    } 
    
    // If they die in this tick, catch it here rather than else if
    if (!this.alive) {
      if (confirm(t.get('common.snake.game-over'))) {
        this.snake.reset();
        this.direction = { x: 1, y: 0 };
        this.food.reset();
        this.speed = 1000;
        this.alive = true;
        this.score.set(0);
      } else {
        this.cleanup();
      }
    }
  }

  async gameloop() {
    while (this.running) {
      requestAnimationFrame(this.tick.bind(this));

      
      await new Promise(resolve => setTimeout(resolve, this.speed));
    }
  }

  cleanup() {
    document.removeEventListener("keydown", this.keydownEvent.bind(this));
    this.running = false;
  }
}

const mapPointToCanvasPosition = (point: IPoint, cellSize: number): IPoint => {
  return {
    x: point.x * cellSize,
    y: point.y * cellSize,
  };
};

const getDirection = (event: KeyboardEvent): IPoint => {
  switch (event.key) {
    case "ArrowUp":
      return { x: 0, y: -1 };
    case "ArrowDown":
      return { x: 0, y: 1 };
    case "ArrowLeft":
      return { x: -1, y: 0 };
    case "ArrowRight":
      return { x: 1, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export const startSnake = (canvas: HTMLCanvasElement, score: Writable<number>) => {
  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    throw new Error("Canvas context is null");
  }

  const cellSize = 20;

  const mapWidth = canvas.width / cellSize;
  const mapHeight = canvas.height / cellSize;
  
  const game = new Game(ctx, mapWidth, mapHeight, cellSize, score);

  game.gameloop();

  return () => {
    game.running = false;
    game.cleanup();
  }
}
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from "../constants";
import type Game from "../Game";
import type Human from "../tribe/Human";
import type Tribe from "../tribe/Tribe";
import type { Position } from "../world/Position.interface";
import type { Tile } from "../world/World";
import type World from "../world/World";

class Screen {
  private root: HTMLElement;
  private worldCanvas: HTMLCanvasElement;
  private worldContext: CanvasRenderingContext2D;
  private entityCanvas: HTMLCanvasElement;
  private entityContext: CanvasRenderingContext2D;
  private debugCanvas: HTMLCanvasElement;
  private debugContext: CanvasRenderingContext2D;
  private game: Game;

  constructor(game: Game) {
    this.game = game;

    const root = document.getElementById("root");
    if (!root) throw new Error("no root element found");
    this.root = root;

    const [worldCanvas, worldContext] = this.createCanvas();
    this.worldCanvas = worldCanvas;
    this.worldContext = worldContext;

    const [entityCanvas, entityContext] = this.createCanvas();
    this.entityCanvas = entityCanvas;
    this.entityContext = entityContext;

    const [debugCanvas, debugContext] = this.createCanvas();
    this.debugCanvas = debugCanvas;
    this.debugContext = debugContext;
    this.debugCanvas.id = "debugCanvas";

    this.root.append(this.worldCanvas);
    this.root.append(this.entityCanvas);
    this.root.append(this.debugCanvas);
  }

  public drawWorld() {
    const { world } = this.game;

    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        this.renderTile(world.getTile({ x, y }));
      }
    }
  }

  public drawEntities() {
    const { tribe } = this.game;

    this.entityContext.clearRect(
      0,
      0,
      this.entityCanvas.width,
      this.entityCanvas.height
    );

    this.drawTribe(tribe);
    this.drawCamp(tribe.camp.position);
  }

  private drawTribe(tribe: Tribe) {
    tribe.members.forEach((member) => {
      this.renderHuman(member);
    });
  }

  private drawCamp(pos: Position) {
    this.entityContext.fillStyle = "black";

    this.entityContext.fillRect(
      pos.x * (SCREEN_WIDTH / WORLD_WIDTH),
      pos.y * (SCREEN_HEIGHT / WORLD_HEIGHT),
      SCREEN_WIDTH / 100,
      SCREEN_HEIGHT / 100
    );
  }

  public drawDebug(tiles: Position[], color: string) {
    // this.debugContext.clearRect(
    //   0,
    //   0,
    //   this.debugCanvas.width,
    //   this.debugCanvas.height
    // );
    this.debugContext.fillStyle = color;

    tiles.forEach((pos) => {
      this.debugContext.fillRect(
        pos.x * (SCREEN_WIDTH / WORLD_WIDTH),
        pos.y * (SCREEN_HEIGHT / WORLD_HEIGHT),
        SCREEN_WIDTH / 100,
        SCREEN_HEIGHT / 100
      );
    });
  }

  renderTile = (tile: Tile) => {
    this.worldContext.fillStyle = tile.color;

    this.worldContext.fillRect(
      tile.position.x * (SCREEN_WIDTH / WORLD_WIDTH),
      tile.position.y * (SCREEN_HEIGHT / WORLD_HEIGHT),
      SCREEN_WIDTH / 100,
      SCREEN_HEIGHT / 100
    );
  };

  public renderHuman(human: Human) {
    this.entityContext.fillStyle = human.job ? human.job.color : 'blue';

    this.entityContext.fillRect(
      human.position.x * (SCREEN_WIDTH / WORLD_WIDTH),
      human.position.y * (SCREEN_HEIGHT / WORLD_HEIGHT),
      SCREEN_WIDTH / 100,
      SCREEN_HEIGHT / 100
    );
  }

  private createCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.width = SCREEN_WIDTH + "px";
    canvas.style.height = SCREEN_HEIGHT + "px";

    canvas.style.position = "fixed";
    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.transform = "translate(-50%, -50%)";

    return [canvas, context];
  }
}

export default Screen;

import { WORLD_HEIGHT, WORLD_WIDTH } from "../constants";
import type Game from "../Game";
import type { Position } from "./Position.interface";

export enum TileName {
  GRASS = "grass",
  TREE = "tree",
  STONE = "stone",
  WATER = "water",
  TALL_GRASS = "tall_grass",
}

export interface Tile {
  name: TileName;
  color: string;
  position: Position;
}

export type TileMap = {
  [key in keyof typeof TileName]: Pick<Tile, "color" | "name">;
};

export const Tiles: TileMap = {
  TREE: { color: "brown", name: TileName.TREE },
  GRASS: { color: "green", name: TileName.GRASS },
  STONE: { color: "gray", name: TileName.STONE },
  WATER: { color: "blue", name: TileName.WATER },
  TALL_GRASS: { color: "#F5F5DC", name: TileName.TALL_GRASS },
};

export type WorldTiles = { [key: `${number}_${number}`]: Tile };

export interface WorldState {
  tiles: WorldTiles;
}

const createDefaultWorld = (width: number, height: number): WorldTiles => {
  const worldTiles: WorldTiles = {};

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      worldTiles[`${x}_${y}`] = { ...Tiles.GRASS, position: { x, y } };
    }
  }

  return worldTiles;
};

class World {
  private state: WorldState;
  private game: Game;

  constructor(game) {
    this.state = {
      tiles: createDefaultWorld(WORLD_WIDTH, WORLD_HEIGHT),
    };

    this.game = game;

    this.plantTrees();
    this.plantTallGrass();
  }

  get tiles() {
    return this.state.tiles;
  }

  public getTile(pos: Position): Tile | undefined {
    return this.state.tiles[`${pos.x}_${pos.y}`];
  }

  public removeTile(pos: Position) {
    const tile = this.getTile(pos);
    if (tile) {
      tile.name = Tiles.GRASS.name;
      tile.color = Tiles.GRASS.color;
    }
  }

  private plantTrees() {
    const TREE_THRESHOLD = 0.002;
    // const TREE_THRESHOLD = 0.3;

    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const TREE_CALC = Math.random();

        if (TREE_CALC < TREE_THRESHOLD && x !== 50 && y !== 50) {
          const tile = this.getTile({ x, y });
          tile.color = Tiles.TREE.color;
          tile.name = Tiles.TREE.name;
        }
      }
    }
  }

  private plantTallGrass() {
    const TALL_GRASS_THRESHOLD = 0.005;

    for (let y = 0; y < WORLD_HEIGHT; y++) {
      for (let x = 0; x < WORLD_WIDTH; x++) {
        const TREE_CALC = Math.random();

        if (TREE_CALC < TALL_GRASS_THRESHOLD && x !== 50 && y !== 50) {
          const tile = this.getTile({ x, y });
          tile.color = Tiles.TALL_GRASS.color;
          tile.name = Tiles.TALL_GRASS.name;
        }
      }
    }
  }
}

export default World;

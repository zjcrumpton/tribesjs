import { TileName } from "../world/World";

export enum Item {
  WOOD_LOG = "wood_log",
  TALL_GRASS = "tall_grass",
  ACORN = "acorn",
  TALL_GRASS_SEED = "tall_grass_seed",
}

export const TileItems = {
  [TileName.TREE]: [Item.WOOD_LOG],
  [TileName.TALL_GRASS]: [Item.TALL_GRASS],
};

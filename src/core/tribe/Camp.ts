import type { Position } from "../world/Position.interface";
import type { Item } from "./Items";

export interface Storage {
  [Item.WOOD_LOG]: number;
  [Item.TALL_GRASS]: number;
  [Item.ACORN]: number;
  [Item.TALL_GRASS_SEED]: number;
}

class Camp {
  private _position: Position;
  private _storage: Storage;

  constructor() {
    this._storage = {
      wood_log: 0,
      tall_grass: 0,
      acorn: 0,
      tall_grass_seed: 0,
    };

    this._position = { x: 50, y: 50 };
  }

  get position() {
    return this._position;
  }

  get storage() {
    return this._storage;
  }

  public storeItem(item: keyof Storage, amount: number) {
    this._storage[item] += amount;
  }
}

export default Camp;

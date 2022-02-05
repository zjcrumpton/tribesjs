import type { Position } from "../world/Position.interface";
import type { Item } from "./Body";

interface Storage {
  [Item.WOOD_LOG]: number;
}

class Camp {
  private _position: Position;
  private _storage: Storage;

  constructor() {
    this._storage = {
      wood_log: 0,
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

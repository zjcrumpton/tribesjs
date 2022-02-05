import Camp from "./Camp";
import Human from "./Human";
import { Jobs } from "./Jobs.enum";

class Tribe {
  private _members: Human[] = [];
  private _camp: Camp = new Camp();

  constructor() {
    this._members.push(new Human(Jobs.WOOD, { x: 50, y: 50 }, this));
  }

  get members() {
    return this._members;
  }

  get camp() {
    return this._camp;
  }
}

export default Tribe;

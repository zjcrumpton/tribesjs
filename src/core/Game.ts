import Screen from "./screen/Screen";
import Tribe from "./tribe/Tribe";
import World from "./world/World";

class Game {
  private _screen: Screen;
  private _world: World;
  private _tribe: Tribe;

  constructor() {
    this._screen = new Screen(this);
    this._world = new World(this);
    this._tribe = new Tribe(this);

    this._screen.drawWorld();
    this._screen.drawEntities();
  }

  get world() {
    return this._world;
  }

  get screen() {
    return this._screen;
  }

  get tribe() {
    return this._tribe;
  }

  get storage() {
    return this._tribe.camp.storage;
  }

  get jobList() {
    return this._tribe.jobList;
  }

  public advanceTime() {
    this._tribe.members.forEach((member) => {
      member.update();
    });

    this._screen.drawEntities();
  }
}

export default Game;

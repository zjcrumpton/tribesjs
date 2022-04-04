import { Entity } from "./ecs";
import { HealthComponent, NameComponent, PositionComponent } from "./ecs/components";
import Screen from "./screen/Screen";
import Tribe from "./tribe/Tribe";
import World from "./world/World";

const et = new Entity();
et.addComponent(NameComponent());
et.addComponent(HealthComponent(50));
et.addComponent(PositionComponent());
et.print();

const e2 = new Entity();
e2.addComponent(NameComponent());
e2.print();
console.log(e2.components.name.value)
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

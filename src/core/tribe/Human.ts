import { WORLD_HEIGHT, WORLD_WIDTH } from "../constants";
import type Screen from "../screen/Screen";
import type { Position } from "../world/Position.interface";
import World, { TileName } from "../world/World";
import HumanBody from "./Body";
import { TileItems } from "./Items";
import { Job, JobName, Jobs } from "./Jobs.enum";
import type Tribe from "./Tribe";
import MaleNames from "../../res/male-names.json";

// Player adds jobs to a job queue
// any tribesman assigned to that type of job can pick it up
// tribesman will choose based on priority
// if they are hungry, thirsty, or tired, that is higher
// priority than their job.
// They will do what they need to do then do their job,
// then take another job from the job queue

// allow player to say chop a specific tree, or they can just say gather x amount of wood
// a specific tree will include a destination, if no specifics then they will search

// switch over state

enum HumanState {
  IDLE,
  WALKING,
  WORKING,
}

interface HumanStateMachine {
  state: HumanState;
}

const getRandomName = () => {
  const randomIndex = Math.floor(Math.random() * MaleNames.data.length);
  return MaleNames.data[randomIndex];
};

class Human {
  private _name: string;
  private _job: Job;
  private _position: Position;
  private _body: HumanBody;
  private _destination: Position | null;
  private _visitedTiles: { [key: string]: number };
  private SIGHT_RANGE = 100;
  private _tribe: Tribe;

  private machine: HumanStateMachine;

  constructor(job: Job = Jobs.WOOD, position: Position, tribe: Tribe) {
    this._job = job;
    this._position = position;
    this._visitedTiles = {};
    this._body = new HumanBody();
    this._tribe = tribe;
    this._name = getRandomName();

    this.machine = {
      state: HumanState.IDLE,
    };
  }

  get name() {
    return this._name;
  }

  get job() {
    return this._job;
  }

  get position() {
    return this._position;
  }

  public update() {
    switch (this.machine.state) {
      case HumanState.IDLE:
        this.wander();
    }
  }

  private wander() {
    const xAxis = Math.random();
    const yAxis = Math.random();

    const adjustXAxis = xAxis >= 0.5 ? 1 : -1;
    const adjustYAxis = yAxis >= 0.5 ? 1 : -1;

    this.position.x = Math.min(
      Math.max(this.position.x + adjustXAxis, 0),
      WORLD_WIDTH
    );
    this.position.y = Math.min(
      Math.max(this.position.y + adjustYAxis, 0),
      WORLD_HEIGHT
    );
  }

  public doJob(world: World, screen: Screen) {
    switch (this._job.name) {
      case JobName.WOOD:
        this.gather(world, TileName.TREE, screen);
        break;
      case JobName.TALL_GRASS:
        this.gather(world, TileName.TALL_GRASS, screen);
      default:
        return;
    }
  }

  /**
   * Search the world for a resource and
   * attempt to bring it back to camp
   */
  private gather(world: World, tileName: TileName, screen: Screen) {
    this._visitedTiles = {};

    // if hands are full, head towards camp
    if (
      this._body.isInventoryFull() &&
      this._destination !== this._tribe.camp.position
    ) {
      this._destination = this._tribe.camp.position;
    }

    if (
      this._position.x === this._tribe.camp.position.x &&
      this._position.y === this._tribe.camp.position.y
    ) {
      this._destination = null;
      this._tribe.camp.storeItem(this._body.emptyLeftHand(), 1);
      this._tribe.camp.storeItem(this._body.emptyRightHand(), 1);

      console.log(this._tribe.camp.storage);
    }

    // check current tile for resource
    const currentTile = world.getTile(this._position);
    if (currentTile && currentTile.name === tileName) {
      this._destination = null;
      try {
        const itemsHere = TileItems[tileName];
        itemsHere.forEach((i) => {
          this._body.pickUpItem(i);
          world.removeTile(this._position);
          screen.drawWorld(world);
        });
      } catch (err) {
        console.log(err);
        console.log("could not pick up log");
        this._destination = this._tribe.camp.position;
      }
    }

    this.searchAroundTile(currentTile.position, world, screen, tileName);
  }

  private walkTowardDestination() {
    if (this._destination.x > this._position.x) {
      this._position.x += 1;
    } else if (this._destination.x < this._position.x) {
      this._position.x -= 1;
    }

    if (this._destination.y > this._position.y) {
      this._position.y += 1;
    } else if (this._destination.y < this._position.y) {
      this._position.y -= 1;
    }
  }

  private searchAroundTile(
    pos: Position,
    world: World,
    screen: Screen,
    tileName: TileName,
    distance = 0
  ) {
    // don't search too far
    if (distance > this.SIGHT_RANGE) {
      return;
    }

    // we've already found a tree
    if (this._destination) {
      this.walkTowardDestination();
      return;
    }

    const UP_LEFT = {
      x: Math.max(pos.x - distance, 0),
      y: Math.max(pos.y - distance, 0),
    };
    const UP_RIGHT = {
      x: Math.min(pos.x + distance, WORLD_WIDTH),
      y: Math.max(pos.y - distance, 0),
    };
    const DOWN_LEFT = {
      x: Math.max(pos.x - distance, 0),
      y: Math.min(pos.y + distance, WORLD_HEIGHT),
    };
    const DOWN_RIGHT = {
      x: Math.min(pos.x + distance, WORLD_WIDTH),
      y: Math.min(pos.y + distance, WORLD_HEIGHT),
    };

    const currentTileSet = [];
    currentTileSet.push(world.getTile(UP_LEFT));
    currentTileSet.push(world.getTile(UP_RIGHT));
    currentTileSet.push(world.getTile(DOWN_LEFT));
    currentTileSet.push(world.getTile(DOWN_RIGHT));

    // add top set
    for (let x = UP_LEFT.x + 1; x < UP_RIGHT.x; x++) {
      currentTileSet.push(world.getTile({ x, y: UP_LEFT.y }));
    }

    // add right set
    for (let y = UP_RIGHT.y + 1; y < DOWN_RIGHT.y; y++) {
      currentTileSet.push(world.getTile({ x: UP_RIGHT.x, y }));
    }

    // add left set
    for (let y = UP_LEFT.y + 1; y < DOWN_LEFT.y; y++) {
      currentTileSet.push(world.getTile({ x: UP_LEFT.x, y }));
    }

    // add bottom set
    for (let x = DOWN_LEFT.x + 1; x < DOWN_RIGHT.x; x++) {
      currentTileSet.push(world.getTile({ x, y: DOWN_LEFT.y }));
    }

    for (let i = 0; i < currentTileSet.length; i++) {
      const tile = currentTileSet[i];
      if (
        tile &&
        !this._visitedTiles[`${tile.position.x}_${tile.position.y}`]
      ) {
        // screen.drawDebug([tile.position], "#0000ff80");
        if (tile.name === tileName) {
          this._destination = tile.position;
        }
      }
    }

    this.searchAroundTile(pos, world, screen, tileName, distance + 1);
  }
}

export default Human;

import { WORLD_HEIGHT, WORLD_WIDTH } from "../constants";
import type Screen from "../screen/Screen";
import type { Position } from "../world/Position.interface";
import World, { TileName } from "../world/World";
import HumanBody from "./Body";
import { Job, JobName, Jobs } from "./Jobs.enum";
import type Tribe from "./Tribe";

class Human {
  private _job: Job;
  private _position: Position;
  private _body: HumanBody;
  private _destination: Position | null;
  private _visitedTiles: { [key: string]: number };
  private SIGHT_RANGE = 50;
  private _tribe: Tribe;

  constructor(job: Job = Jobs.WOOD, position: Position, tribe: Tribe) {
    this._job = job;
    this._position = position;
    this._visitedTiles = {};
    this._body = new HumanBody();
    this._tribe = tribe;
  }

  get job() {
    return this._job;
  }

  get position() {
    return this._position;
  }

  public doJob(world: World, screen: Screen) {
    switch (this._job.name) {
      case JobName.WOOD:
        this.gather(world, TileName.TREE, screen);
        break;
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
        this._body.pickUpItem(tileName);
        world.removeTile(this._position);
        screen.drawWorld(world);
      } catch (err) {
        console.log(err);
        console.log("could not pick up log");
      }
    }

    this.searchAroundTile(currentTile.position, world, screen);
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
        if (tile.name === TileName.TREE) {
          this._destination = tile.position;
        }
      }
    }

    this.searchAroundTile(pos, world, screen, distance + 1);
  }
}

export default Human;

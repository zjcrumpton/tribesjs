import Screen from "./screen/Screen";
import Tribe from "./tribe/Tribe";
import World from "./world/World";

class Game {
  private screen: Screen;
  private world: World;
  private tribe: Tribe;

  constructor() {
    this.screen = new Screen();
    this.world = new World();
    this.tribe = new Tribe();

    this.screen.drawWorld(this.world);
    this.screen.drawEntities(this.tribe);
  }

  get storage() {
    return this.tribe.camp.storage;
  }

  get jobList() {
    return this.tribe.jobList;
  }

  public advanceTime() {
    this.tribe.members.forEach((member) => {
      // member.doJob(this.world, this.screen);
      member.update(this.world, this.screen);
    });
    if (this.tribe.members.length) {
      //   const player = this.tribe.members[0];
      //   player.position.x += 1;
      //   player.position.y += 1;
    }

    this.screen.drawEntities(this.tribe);
  }
}

export default Game;

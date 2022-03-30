import Camp from "./Camp";
import Human from "./Human";
import JobList from "./JobList";
import { Jobs } from "./Jobs.enum";

class Tribe {
  private _members: Human[] = [];
  private _camp: Camp = new Camp();
  private _jobList: JobList = new JobList();

  constructor() {
    this._members.push(new Human(Jobs.WOOD, { x: 50, y: 50 }, this));
    this.members.push(new Human(Jobs.TALL_GRASS, { x: 50, y: 50 }, this));
  }

  get members() {
    return this._members;
  }

  get camp() {
    return this._camp;
  }

  get jobList() {
    return this._jobList;
  }
}

export default Tribe;

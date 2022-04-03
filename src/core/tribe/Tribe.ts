import type Game from "../Game";
import Camp from "./Camp";
import Human from "./Human";
import JobList from "./JobList";

class Tribe {
  private _members: Human[] = [];
  private _camp: Camp = new Camp();
  private _jobList: JobList = new JobList();
  private _game: Game;

  constructor(game: Game) {
    this._game = game;
    this._members.push(new Human({ x: 50, y: 50 }, this, game));
    this.members.push(new Human({ x: 50, y: 50 }, this, game));
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

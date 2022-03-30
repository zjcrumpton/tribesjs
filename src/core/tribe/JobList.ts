import type Human from "./Human";
import { ResourceType } from "./Jobs.enum";

enum JobType {
  GATHER,
}

interface JobListing<T> {
  id: string;
  type: JobType;
  member: Human | null;
  data: T;
}

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

export function createJob<T>(type: JobType, data: T): JobListing<T> {
  return { id: guidGenerator(), type, member: null, data };
}

export const createGatherWoodJob = (quanitity: number) =>
  createJob(JobType.GATHER, { resource: ResourceType.WOOD, quanitity });

class JobList {
  private _jobs: JobListing<any>[] = [];

  public get jobs() {
    return this._jobs;
  }

  public add<T>(job: JobListing<T>) {
    this._jobs.push(job);
  }

  public remove<T>(job: JobListing<T>) {
    this._jobs = this._jobs.filter((j) => j !== job);
  }
}

export default JobList;

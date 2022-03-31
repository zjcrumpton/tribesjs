import type Human from "./Human";
import { ResourceType } from "./Jobs.enum";

export enum JobType {
  GATHER = 'GATHER',
}

export interface JobListing<T> {
  id: string;
  type: JobType;
  color: string;
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

export function createJob<T>(type: JobType, color: string, data: T): JobListing<T> {
  return { id: guidGenerator(), type, member: null, data, color };
}

export const createGatherWoodJob = (quantity: number) =>
  createJob(JobType.GATHER, 'red', { resource: ResourceType.WOOD, quantity });

export const createGatherGrassJob = (quantity: number) => createJob(JobType.GATHER, 'yellow', { resource: ResourceType.TALL_GRASS, quantity });

export type PossibleJobs = ReturnType<typeof createGatherWoodJob> | ReturnType<typeof createGatherGrassJob>;

class JobList {
  private _jobs: PossibleJobs[] = [];

  public get jobs() {
    return this._jobs;
  }

  public add<T>(job: PossibleJobs) {
    this._jobs.push(job);
  }

  public remove<T>(job: PossibleJobs) {
    this._jobs = this._jobs.filter((j) => j !== job);
  }

  public assignJob(member: Human): PossibleJobs | null {
    let job = null;
    const availableJobs = this._jobs.filter((j) => !j.member);
    if (availableJobs.length) {
      job = availableJobs[0];
      job.member = member;
    }

    return job;
  }
}

export default JobList;

export enum JobName {
  WOOD = "wood",
}

export interface Job {
  color: string;
  name: JobName;
}

export type JobMap = { [key in keyof typeof JobName]: Job };

export const Jobs: JobMap = {
  WOOD: { color: "yellow", name: JobName.WOOD },
};

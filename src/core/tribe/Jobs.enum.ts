export enum JobName {
  WOOD = "wood",
  TALL_GRASS = "tall_grass",
}

export enum ResourceType {
  WOOD = "wood",
  TALL_GRASS = "tall_grass",
}

export interface Job {
  color: string;
  name: JobName;
}

export type JobMap = { [key in keyof typeof JobName]: Job };

export const Jobs: JobMap = {
  WOOD: { color: "yellow", name: JobName.WOOD },
  TALL_GRASS: { color: "orange", name: JobName.TALL_GRASS },
};

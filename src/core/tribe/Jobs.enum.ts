import { TileName } from "../world/World";

export enum JobName {
  WOOD = "wood",
  TALL_GRASS = "tall_grass",
}

export enum ResourceType {
  WOOD = "wood",
  TALL_GRASS = "tall_grass",
}

export function getTileNameFromResource(resource: ResourceType) {
  switch (resource) {
    case ResourceType.WOOD:
      return TileName.TREE;
    case ResourceType.TALL_GRASS:
      return TileName.TALL_GRASS;
  }
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

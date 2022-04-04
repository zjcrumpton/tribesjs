import { getRandomMaleName } from "../../utils";
import { createComponent } from "./createComponent";

export function NameComponent(name: string = getRandomMaleName()) {
  return createComponent('name', { value: name });
}

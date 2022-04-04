import type { Position } from "../types";
import { createComponent } from "./createComponent";

export function PositionComponent(pos: Position = { x: 50, y: 50 }){
  return createComponent('position', pos);
}

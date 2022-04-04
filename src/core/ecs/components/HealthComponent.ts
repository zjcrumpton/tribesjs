import { createComponent } from "./createComponent";

export function HealthComponent(value: number = 20) {
  return createComponent('health', { value });
}

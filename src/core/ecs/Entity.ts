import { generateGuid } from "../utils";
import type { Component, ComponentMap } from "./Component.type";

export class Entity {
  private _id: string;
  private _components: ComponentMap;

  constructor() {
    this._id = generateGuid();
    this._components = {};
  }

  get id() {
    return this._id;
  }

  get components() {
    return this._components;
  }

  public addComponent(component: Component) {
    this._components = { ...this._components, ...component };
  }

  public removeComponent(componentName: keyof ComponentMap) {
    delete this._components[componentName];
  }

  public print() {
    console.log(JSON.stringify(this, null, 4));
  }
}

import { Entity } from "./Entity";

export class ECS {
  private static _count = 0;

  public static createEntity(): Entity {
    const entity = new Entity();
     ECS.increaseCount();

     return entity;
  }

  static get count() {
    return this._count;
  }

  private static increaseCount() {
    this._count++;
  }
}

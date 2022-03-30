import type { Item } from "./Items";

interface Hand {
  holding: Item | null;
}

class HumanBody {
  private _leftHand: Hand = { holding: null };
  private _rightHand: Hand = { holding: null };

  get leftHand() {
    return this._leftHand;
  }

  get rightHand() {
    return this._rightHand;
  }

  public isInventoryFull = (): boolean => {
    return !!this._leftHand.holding && !!this._rightHand.holding;
  };

  public pickUpItem(item: Item) {
    if (!this._rightHand.holding) {
      this._rightHand.holding = item;
      return;
    }

    if (!this._leftHand.holding) {
      this._leftHand.holding = item;
      return;
    }

    console.log("HANDS ARE FULL");
    throw new Error(
      "Both hands are full, drop something to pick up a new item"
    );
  }

  public emptyLeftHand() {
    const holding = this._leftHand.holding;
    this._leftHand.holding = null;
    return holding;
  }

  public emptyRightHand() {
    const holding = this._rightHand.holding;
    this._rightHand.holding = null;
    return holding;
  }
}

export default HumanBody;

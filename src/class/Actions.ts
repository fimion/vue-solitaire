import { CARD_RANKS, SUIT_OPPOSITES } from "@src/constants.js";

export class BaseAction {
  action: string | null;
  target: any;

  constructor(action: string | null) {
    this.action = action;
    this.target = null;
  }

  validate(selection) {
    return true;
  }
}

export class ClearSelectionAction extends BaseAction {
  constructor() {
    super(null);
  }
  validate(selection) {
    return false;
  }
}

export class CardFlopAction extends BaseAction {
  constructor() {
    super("flop/flopCards");
  }
}

export class DeckResetAction extends BaseAction {
  constructor() {
    super("deck/resetDeck");
  }
}

export class PlayStackAction extends BaseAction {
  constructor(stack: number, target: any) {
    super("play/" + stack + "/concatCards");
    this.target = target;
  }
  validate(selection) {
    const selected = selection.selectedCard();
    if (selected.rank === "K" && this.target.isEmpty) {
      return true;
    }

    const selectedIndex = CARD_RANKS.indexOf(selected.rank),
      targetIndex = CARD_RANKS.indexOf(this.target.rank),
      isOpposite = SUIT_OPPOSITES.get(selected.suit).has(this.target.suit),
      isNext = targetIndex - selectedIndex === 1;

    return isOpposite && isNext;
  }
}

export class FinalStackAction extends BaseAction {
  stack: string;

  constructor(stack: string, target: any) {
    super("final/" + stack + "/pushCard");
    this.stack = stack;
    this.target = target;
  }

  validate(selection) {
    if (selection.cards.length !== 1) {
      return false;
    }
    const selected = selection.selectedCard();
    if (selected.suit !== this.stack) {
      return false;
    }
    const targetRankIndex = CARD_RANKS.indexOf(this.target.rank),
      selectedRankIndex = CARD_RANKS.indexOf(selected.rank);

    return selectedRankIndex - targetRankIndex === 1;
  }
}

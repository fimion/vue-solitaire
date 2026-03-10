import { CARD_RANKS, SUIT_OPPOSITES } from "@src/constants.js";
import type Card from "@class/Card.ts";
import { type BaseSelection } from "@class/Selections.ts";
import EmptyCard from "@class/EmptyCard.ts";

export class BaseAction {
  action: string | null;
  target: Card | EmptyCard | null;

  constructor(action: string | null) {
    this.action = action;
    this.target = null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: BaseSelection) {
    return true;
  }
}

export class ClearSelectionAction extends BaseAction {
  constructor() {
    super(null);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_: BaseSelection) {
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
  constructor(stack: number, target: Card | EmptyCard | null) {
    super("play/" + stack + "/concatCards");
    this.target = target;
  }
  validate(selection: BaseSelection) {
    const selected = selection.selectedCard();
    if(!this.target) return false;
    if(this.target.isEmpty){
      return selected.rank === "K";
    }

    const card = (<Card>this.target);
    const selectedIndex = CARD_RANKS.indexOf(selected.rank),
      targetIndex = CARD_RANKS.indexOf(card.rank),
      isOpposite = SUIT_OPPOSITES.get(selected.suit).has(card.suit),
      isNext = targetIndex - selectedIndex === 1;

    return isOpposite && isNext;
  }
}

export class FinalStackAction extends BaseAction {
  stack: string;

  constructor(stack: string, target: Card) {
    super("final/" + stack + "/pushCard");
    this.stack = stack;
    this.target = target;
  }

  validate(selection: BaseSelection) {
    if (selection.cards.length !== 1) {
      return false;
    }
    const selected = selection.selectedCard();
    if (selected.suit !== this.stack) {
      return false;
    }
    const card = (<Card>this.target);
    const targetRankIndex = CARD_RANKS.indexOf(card.rank),
      selectedRankIndex = CARD_RANKS.indexOf(selected.rank);

    return selectedRankIndex - targetRankIndex === 1;
  }
}

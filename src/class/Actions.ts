import { CARD_RANKS, SUIT_OPPOSITES } from "@src/constants.js";
import type Card from "@class/Card.ts";
import { type BaseSelection } from "@class/Selections.ts";
import EmptyCard from "@class/EmptyCard.ts";
import { useFlopStore } from "@stores/flop.js";
import { useDeckStore } from "@stores/deck.js";
import { usePlayStore } from "@stores/play.js";
import { useFinalStore } from "@stores/final.js";

type ActionFn = (cards: Card[]) => void | Promise<void>;

export class BaseAction {
  action: ActionFn | null;
  target: Card | EmptyCard | null;

  constructor(action: ActionFn | null) {
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
    super((cards) => useFlopStore().flopCards(cards));
  }
}

export class DeckResetAction extends BaseAction {
  constructor() {
    super((cards) => useDeckStore().resetDeck(cards));
  }
}

export class PlayStackAction extends BaseAction {
  constructor(stack: number, target: Card | EmptyCard | null) {
    super((cards) => usePlayStore().concatCards(stack, cards));
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
    super((cards) => useFinalStore().pushCard(stack, cards[0]));
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

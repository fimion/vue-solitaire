import { computed } from "vue";
import { useGameStore } from "@stores/game.js";
import { useFinalStore } from "@stores/final.js";

/** @typedef {import('@/class/Card')} Card */
/** @typedef {import('@/class/Selections').BaseSelection} BaseSelection */

export function useFinalStackTopCard() {
  const finalStore = useFinalStore();

  /**
   *
   * @param stack
   * @returns {Card}
   */
  function finalStackTopCardMethod(stack: string) {
    return finalStore.topCard(stack);
  }

  return { finalStackTopCardMethod };
}

/**
 *
 * @param {Card} card
 * @param {BaseSelection} selection
 * @returns {boolean}
 */
export function isSelected(card, selection) {
  if (selection) {
    return selection.cards.findIndex((c) => c.card === card.card) > -1;
  }
  return false;
}

export function useSelection() {
  const gameStore = useGameStore();
  const currentSelection = computed(() => gameStore.currentSelection);

  function isCardSelected(card) {
    return isSelected(card, currentSelection.value);
  }

  return { currentSelection, isSelected: isCardSelected };
}

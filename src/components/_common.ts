import { computed } from "vue";
import { useStore } from "vuex";

/** @typedef {import('@/class/Card')} Card */
/** @typedef {import('@/class/Selections').BaseSelection} BaseSelection */

export function useFinalStackTopCard() {
  const store = useStore();

  /**
   *
   * @param stack
   * @returns {Card}
   */
  function finalStackTopCardMethod(stack) {
    return store.getters["final/" + stack + "/topCard"];
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
  const store = useStore();
  const currentSelection = computed(() => store.state.currentSelection);

  function isCardSelected(card) {
    return isSelected(card, currentSelection.value);
  }

  return { currentSelection, isSelected: isCardSelected };
}

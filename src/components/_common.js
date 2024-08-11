import { mapState } from "vuex";
/** @typedef {import('@/class/Card')} Card */
/** @typedef {import('@/class/Selections').BaseSelection} BaseSelection */
/**
 *
 * @param stack
 * @returns {Card}
 */
export function finalStackTopCardMethod(stack) {
  return this.$store.getters["final/" + stack + "/topCard"];
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

export const isSelectedMixin = {
  computed: {
    ...mapState({
      currentSelection: (state) => state.currentSelection,
    }),
  },
  methods: {
    isSelected(card) {
      return isSelected(card, this.currentSelection);
    },
  },
};

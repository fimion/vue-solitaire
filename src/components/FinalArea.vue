<template>
  <final-stack
    v-for="suit in stacks"
    :key="'final-stack-'+suit"
    :suit="suit"
  />
  <teleport
    v-if="gameIsWon"
    to="#portal"
  >
    <confetti />
    <pop-up>
      <h1>You win!</h1>
      <new-game-button />
    </pop-up>
  </teleport>
</template>
<script>
import {defineAsyncComponent} from 'vue'
import FinalStack from '@components/FinalStack.vue'
import {CARD_SUITS} from "@src/constants.js"
import {createNamespacedHelpers} from 'vuex'
import NewGameButton from "@global/new-game-button.vue"

const Confetti = defineAsyncComponent(() => import('./Victory/Confetti.vue'))

const {mapState: finalState} = createNamespacedHelpers('final')
export default {
  name: "FinalArea",
  components: {
    NewGameButton,
    FinalStack,
    Confetti,
  },
  computed: {
    gameIsWon() {

      return CARD_SUITS.map((e) => this.$store.state.final[e].cards.length === 13).reduce((a, b) => b && a)
    },
    ...finalState([
      'stacks',
    ]),
  },
}
</script>

<style>
#final {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: var(--grid-gap);
  grid-template-rows: 1fr;
  align-items: start;
}
</style>

<template>
  <play-stack
    v-for="(val, i) in stacks"
    :key="'play-stack'+i"
    :stack="i"
  />
</template>

<script>
import PlayStack from '@components/PlayStack.vue'
import {createNamespacedHelpers} from 'vuex'

const {mapState: playState} = createNamespacedHelpers('play')
export default {
  name: "PlayArea",
  components: {
    PlayStack,
  },
  computed: {
    ...playState(['stacks']),
  },
}
</script>

<style>
#play {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: var(--grid-gap);
  grid-template-rows: 1fr;
  align-items: start;
}
</style>

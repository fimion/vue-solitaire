<template>
  <div class="flop-area">
    <card-stack>
      <playing-card v-for="card in cards"
                    :key="card.card"
                    :card="card"/>
    </card-stack>
  </div>
</template>

<script>
  import CardStack from './CardStack.vue'
  import PlayingCard from './PlayingCard.vue'

  import {createNamespacedHelpers} from 'vuex'

  const {mapState:flopState,mapActions:flopActions} = createNamespacedHelpers('flop')

  export default {
    name: "FlopArea",
    computed:{
      ...flopState(['cards']),
    },
    methods:{

    },
    components:{
      CardStack,
      PlayingCard,
    },

  }
</script>

<style scoped>

</style>
<template>
  <div>
    <card-holder v-if="cards.length === 0">
      <base-svg></base-svg>
    </card-holder>
    <vertical-spread v-else>
      <playing-card v-for="card in cards"
                    :key="card.card"
                    :card="card"/>
    </vertical-spread>
  </div>
</template>

<script>
  export default {
    name: "PlayStack",
    props:{
      stack:{
        type:Number,
        required:true,
      },
    },
    computed:{
      cards(){
        return this.$store.state.play[this.stack].cards
      },
    },
  }
</script>

<style scoped>

</style>
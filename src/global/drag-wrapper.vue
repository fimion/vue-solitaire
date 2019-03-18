<template>
  <drag v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template slot="image">
      <vertical-spread v-if="currentSelection" class="selection-spread">
        <playing-card v-for="card in currentSelection.cards"
                      class="selection-card"
                      :key="'DragSelection'+card.card"
                      :card="card"></playing-card>
      </vertical-spread>
    </template>
  </drag>
</template>

<script>
  import {Drag} from 'vue-drag-drop'
  import {mapState} from 'vuex'
  export default {
    name: "drag-wrapper",
    components:{
      Drag,
    },
    computed:{
      ...mapState(['currentSelection']),
    },
  }
</script>

<style scoped>
.selection-spread>.selection-card{
  transition:none;
  opacity:1;
  background:var(--color-white);
}
</style>
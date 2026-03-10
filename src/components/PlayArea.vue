<script setup vapor lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import PlayStack from "@components/PlayStack.vue";

const store = useStore();
const stacks = computed(() => store.state.play.stacks);
</script>

<template>
  <play-stack v-for="(val, i) in stacks" :key="'play-stack' + i" :stack="i" />
</template>

<style>
#play {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: var(--grid-gap);
  grid-template-rows: 1fr;
  align-items: start;
}
</style>

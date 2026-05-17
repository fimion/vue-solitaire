<script setup vapor lang="ts">
import { computed } from "vue";
import { usePlayStore } from "@stores/play.js";
import PlayStack from "@components/PlayStack.vue";

const playStore = usePlayStore();
const stacks = computed(() => playStore.stacks);
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

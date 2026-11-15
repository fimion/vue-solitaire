<script setup vapor lang="ts">
import { useGameStore } from "@stores/game.js";
import type { Seed } from "@src/utils/shuffle.js";

interface Props {
  seed?: Seed;
}

const props = defineProps<Props>();
const emit = defineEmits(["confirm"]);
const gameStore = useGameStore();

function startGame() {
  emit("confirm");
  gameStore.newGame(props.seed);
}
</script>
<template>
  <button @click="startGame">
    <slot>Start a New Game</slot>
  </button>
</template>
<style scoped></style>

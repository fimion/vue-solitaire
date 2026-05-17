<script setup vapor  lang="ts">
import { useGameStore } from "@stores/game.js";

const emit = defineEmits(["confirm"]);
const gameStore = useGameStore();

function startGame() {
  emit("confirm");
  gameStore.newGame();
}
</script>
<template>
  <button @click="startGame">
    <slot>Start a New Game</slot>
  </button>
</template>
<style scoped></style>

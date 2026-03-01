<script setup lang="ts">
import { useStore } from "vuex";

const emit = defineEmits(["confirm"]);
const store = useStore();

function startGame() {
  emit("confirm");
  store.dispatch("newGame");
}
</script>
<template>
  <button @click="startGame">
    <slot>Start a New Game</slot>
  </button>
</template>
<style scoped></style>

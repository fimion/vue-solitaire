<script setup>
import {
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  nextTick,
} from "vue";
import ConfettiGenerator from "confetti-js";

let confettiInstance = null;

function renderConfetti() {
  confettiInstance = new ConfettiGenerator({
    target: "confetti",
    props: [
      { type: "svg", src: "img/ClubIcon.svg", weight: 0.2 },
      { type: "svg", src: "img/DiamondIcon.svg", weight: 0.2 },
      { type: "svg", src: "img/HeartIcon.svg", weight: 0.2 },
      { type: "svg", src: "img/SpadeIcon.svg", weight: 0.2 },
      "circle",
      "square",
      "triangle",
      "line",
    ],
  });
  confettiInstance.render();
}

function clear() {
  if (confettiInstance) confettiInstance.clear();
}

onMounted(() => {
  nextTick(renderConfetti);
});

onBeforeUpdate(() => {
  clear();
});

onUpdated(() => {
  nextTick(renderConfetti);
});

onBeforeUnmount(() => {
  clear();
});
</script>

<template>
  <canvas id="confetti" />
</template>
<style scoped>
#confetti {
  height: 100vh;
  width: 100vw;
  background-color: transparent;
}
</style>
<style>
#portal {
  z-index: 2;
}
</style>

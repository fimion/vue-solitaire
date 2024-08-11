<script>
import ConfettiGenerator from "confetti-js";
let confetti = null;

export default {
  name: "ConfettiDisplay",
  mounted() {
    this.$nextTick(this.confetti);
  },
  beforeUpdate() {
    this.clear();
  },
  updated() {
    this.$nextTick(this.confetti);
  },
  beforeUnmount() {
    this.clear();
  },
  methods: {
    confetti() {
      confetti = new ConfettiGenerator({
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
      confetti.render();
    },
    clear() {
      confetti.clear();
    },
  },
};
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

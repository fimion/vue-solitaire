<script>
export default {
  name: "DefaultCardFaces",
};
</script>

<template>
  <svg v-once class="card-faces" xmlns="http://www.w3.org/2000/svg">
    <symbol id="C" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
      <path
        d="M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -110 -65A230 230 0 1 1 110 -65A10 10 0 0 0 124 -51A210 210 0 1 1 50 150A10 10 0 0 0 30 150Z"
        class="suit club"
      />
    </symbol>
    <symbol id="D" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
      <path
        d="M-400 0C-350 0 0 -450 0 -500C0 -450 350 0 400 0C350 0 0 450 0 500C0 450 -350 0 -400 0Z"
        class="suit diamond"
      />
    </symbol>
    <symbol id="H" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
      <path
        d="M0 -300C0 -400 100 -500 200 -500C300 -500 400 -400 400 -250C400 0 0 400 0 500C0 400 -400 0 -400 -250C-400 -400 -300 -500 -200 -500C-100 -500 0 -400 -0 -300Z"
        class="suit heart"
      />
    </symbol>
    <symbol id="S" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
      <path
        d="M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500Z"
        class="suit spade"
      />
    </symbol>
    <symbol
      id="CW"
      viewBox="-500 -500 1000 1000"
      preserveAspectRatio="xMinYMid"
    >
      <path
        d="M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -110 -65A230 230 0 1 1 110 -65A10 10 0 0 0 124 -51A210 210 0 1 1 50 150A10 10 0 0 0 30 150Z"
        class="suit white club"
      />
    </symbol>
    <symbol id="DW" viewBox="-500 -500 990 990" preserveAspectRatio="xMinYMid">
      <path
        d="M-400 0C-350 0 0 -450 0 -500C0 -450 350 0 400 0C350 0 0 450 0 500C0 450 -350 0 -400 0Z"
        class="suit white diamond"
      />
    </symbol>
    <symbol
      id="HW"
      viewBox="-500 -500 1000 1000"
      preserveAspectRatio="xMinYMid"
    >
      <path
        d="M0 -300C0 -400 100 -500 200 -500C300 -500 400 -400 400 -250C400 0 0 400 0 500C0 400 -400 0 -400 -250C-400 -400 -300 -500 -200 -500C-100 -500 0 -400 -0 -300Z"
        class="suit white heart"
      />
    </symbol>
    <symbol
      id="SW"
      viewBox="-500 -500 1000 1000"
      preserveAspectRatio="xMinYMid"
    >
      <path
        d="M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500Z"
        class="suit white spade"
      />
    </symbol>
  </svg>
</template>

<style scoped>
.card-faces {
  display: none;
}
.club,
.spade {
  fill: var(--color-black);
}
.diamond,
.heart {
  fill: var(--color-red);
}
.suit.white {
  fill: var(--color-white);
}
</style>

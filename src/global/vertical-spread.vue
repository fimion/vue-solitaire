<script>
export default {
  name: "VerticalSpread",
  mounted() {
    this.$nextTick(this.addSpread);
  },
  updated() {
    this.$nextTick(this.addSpread);
  },
  methods: {
    addSpread() {
      let spread = 1;
      this.$el.childNodes.forEach((e) => {
        if (e.style) {
          e.style.gridRow = `${spread}/${spread + 8}`;
          spread++;
          if (e.classList.contains("face-up") && spread > 1) spread++;
        }
      });
    },
  },
};
</script>

<template>
  <div :class="$style['vertical-spread']">
    <slot />
  </div>
</template>

<style module>
.vertical-spread {
  display: grid;
  grid-auto-rows: calc(var(--card-height) / 8);
}

@media screen and (min-width: 768px) {
  .vertical-spread {
    grid-auto-rows: 19px;
  }
}

.vertical-spread > *:global {
  grid-column: 1;
  grid-row-end: span 8;
  z-index: 1;
}
</style>

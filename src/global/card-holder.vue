<script setup vapor lang="ts">
import BaseSvg from "./base-svg.vue";
</script>
<template>
  <button class="card-holder" aria-label="Empty Stack" v-bind="$attrs">
    <slot>
      <base-svg>
        <circle cx="50" cy="75" r="25" />
      </base-svg>
    </slot>
  </button>
</template>
<style scoped>
.card-holder {
  font-size: 2.5rem;
  border: var(--color-white) solid 3px;
  border-radius: 0.5rem;
  max-width: 100px;
  max-height: var(--card-height);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  opacity: 0.5;
  padding: 0;
  margin: 0;
}

@media screen and (min-width: 768px) {
  .card-holder {
    max-height: 150px;
  }
}

.card-holder:disabled {
  cursor: default;
}

circle {
  stroke: var(--color-white);
  stroke-width: 3;
}
</style>

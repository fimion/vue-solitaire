<template>
  <button class="card-holder"
          aria-label="Empty Stack"
          v-on="$listeners"
          v-bind="$attrs">
    <slot>
      <base-svg>
        <circle cx="50" cy="75" r="25" />
      </base-svg>
    </slot>
  </button>
</template>

<script>
  import BaseSvg from "./base-svg.vue"
  export default {
    name: "card-holder",
    components: {BaseSvg},
  }
</script>

<style scoped>
  .card-holder{
    font-size: 2.5rem;
    border: var(--color-white) solid 3px;
    border-radius: 0.5rem;
    max-width: 100px;
    max-height:150px;
    cursor: pointer;
    background-color: transparent;
    opacity:0.5;
  }
  .card-holder:disabled{
    cursor:default;
  }
  circle{
    stroke:var(--color-white);
    stroke-width: 3;
  }
</style>
<template>
  <button class="card-holder"
          aria-label="Empty Stack"
          v-on="$listeners"
          v-bind="$attrs">
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="75" r="25" />
    </svg>
  </button>
</template>

<script>
  export default {
    name: "card-holder",
  }
</script>

<style scoped>
  .card-holder{
    font-size: 2.5rem;
    border: var(--color-white) solid 3px;
    border-radius: 0.5rem;
    max-width: 200px;
    cursor: pointer;
    background-color: transparent;
    opacity:0.5;
  }
  svg{
    pointer-events: none;
    width:100%;
    height:100%;
    fill:transparent;
  }
  circle{
    stroke:var(--color-white);
    stroke-width: 3;
  }
</style>
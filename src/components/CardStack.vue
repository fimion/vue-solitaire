<template>
  <div class="card-stack">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "CardStack",
  }
</script>

<style scoped>
  .card-stack {
    position: relative;
  }

  .card-stack > * {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
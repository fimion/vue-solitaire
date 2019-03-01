<template>
  <svg viewBox="0 0 100 150"
       v-on="$listeners"
       v-bind="$attrs"
       xmlns="http://www.w3.org/2000/svg">
    <slot></slot>
  </svg>
</template>

<script>
  export default {
    name: "base-svg",
  }
</script>

<style scoped>
  svg{
    pointer-events: none;
    width:100%;
    height:100%;
    fill:transparent;
  }
</style>
<script>
export default {
  name: "BaseSvg",
};
</script>
<template>
  <svg viewBox="0 0 100 150" v-bind="$attrs" xmlns="http://www.w3.org/2000/svg">
    <slot />
  </svg>
</template>
<style scoped>
svg {
  pointer-events: none;
  width: 100%;
  fill: transparent;
}
</style>

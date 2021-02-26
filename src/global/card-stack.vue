<script>
export default {
  name: "CardStack",
}
</script>
<template>
  <div class="card-stack">
    <slot />
  </div>
</template>
<style scoped>
  .card-stack {
    position: relative;
    height:100%;
  }

  .card-stack > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: var(--card-height);
  }
  @media screen and (min-width:768px) {
    .card-stack>*{
      max-height: 150px;
    }
  }
</style>

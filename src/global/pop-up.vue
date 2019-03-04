<template>
  <div class="background">
    <div class="pop-up">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pop-up",
  }
</script>

<style scoped>
  .background{
    height:100vh;
    width:100vw;
    display:flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
  }
  .pop-up{
    max-height: 30vh;
    max-width:50vw;
    height:100%;
    width:100%;
    display:flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border-radius:8px;
    box-shadow: var(--box-height-5);
    background-color:var(--color-white);
    color:var(--color-black);
  }
</style>
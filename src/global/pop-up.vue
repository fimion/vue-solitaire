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
    background-color:rgba(0,0,0,0.50);
  }
  .pop-up{
    min-height: 30vh;
    max-width:80vw;
    min-width:50vw;
    display:flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border-radius:8px;
    box-shadow: var(--box-height-5);
    background-color:var(--color-white);
    color:var(--color-black);
    position:relative;
  }
</style>
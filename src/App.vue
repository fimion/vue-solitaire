<template>
  <div id="app">
    <deck></deck>
  </div>
</template>

<script>
import Deck from "./components/Deck";

export default {
  name: "app",
  components: {
    Deck,
  },
};
</script>

<style lang="scss">
  *{
    --color-white:#e6e6e6;
    --color-black:#121212;
    --color-red:#ee1111;
    --playing-mat:#008800;
    margin:0;
    padding:0;
    box-sizing: border-box;
  }
  html,body{
    background-color:var(--playing-mat)
  }
#app {
  width: 99vw;
  background-color:var(--playing-mat);
  margin:0;
  padding:10px;
}
</style>

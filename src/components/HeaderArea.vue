<template>
  <header id="header">
    <div class="github"><a href="https://github.com/fimion/vue-solitaire/">View this on Github</a></div>
    <default-card-faces />
    <div v-if="appUpdated" class="app-updated">There is an update! Refresh to load the new version.</div>
  </header>
</template>

<script>
  import {mapState} from 'vuex'
  import DefaultCardFaces from '^template/card-faces/default-card-faces.vue'
  export default {
    name: "HeaderArea",
    computed:{
      ...mapState(['appUpdated']),
    },
    components:{
      DefaultCardFaces,
    },
  }
</script>

<style scoped>
  #header{
    display:flex;
    flex-flow:row-reverse nowrap;
    color:var(--color-white);
    justify-content: space-between;
    padding: 5px;
    max-width: 760px;
    width:100%;
  }
  a, a:hover, a:visited, a:focus, a:active{
    color:var(--color-white);
    text-decoration: none;
  }

  .github{
    align-self: flex-end;
    justify-self: end;
  }

</style>
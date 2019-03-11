<template>
  <header id="header">
    <div class="github"><a href="https://github.com/fimion/vue-solitaire/">View this on Github</a></div>
    <default-card-faces />
    <div v-if="appUpdated" class="app-updated">There is an update! Refresh to load the new version.</div>
    <!--<div class="buttons">
      <button class="btn">New</button>
      <button class="btn">Undo</button>
      <button aria-label="Options" @click="showOptions=true" class="btn">Opts
        <portal to="fixed-area" v-if="showOptions">
          <pop-up>
            <div>
              Coming Soon
            </div>
            <button class="close" @click="showOptions=false" aria-label="Close Options">X</button>
          </pop-up>
        </portal>
      </button>
    </div>-->
  </header>
</template>

<script>
  import {mapState} from 'vuex'
  import DefaultCardFaces from '^template/card-faces/default-card-faces.vue'
  export default {
    name: "HeaderArea",
    data(){
      return {
        showOptions:false,
      }
    },
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
    padding: 5px 10px;
    max-width: 760px;
    width:100%;
  }
  a, a:hover, a:visited, a:focus, a:active{
    color:var(--color-white);
    text-decoration: none;
  }

  .btn{
    padding:5px;
    margin:0 5px;
  }

  .close{
    position: absolute;
    top:5px;
    right:5px;
    display:flex;
    align-items: center;
    justify-content: center;
    min-height: 20px;
    min-width:20px;
    background:none;
    border:1px solid var(--color-black);
    border-radius:50%;
  }

  .github{
    align-self: flex-end;
    justify-self: end;
  }

</style>
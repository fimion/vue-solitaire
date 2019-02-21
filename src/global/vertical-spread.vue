<template>
  <div class="vertical-spread">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "VerticalSpread",
    methods:{
      addSpread(){
        this.$el.childNodes.forEach((e,i)=>{
          e.style.gridRowStart = i+1
        })
      },
    },
    mounted(){
      this.$nextTick(this.addSpread)
    },
    updated(){
      this.$nextTick(this.addSpread)
    },
  }
</script>

<style scoped>
  .vertical-spread{
    display:grid;
    grid-auto-rows: calc(calc(21.42857vw - 15px) / 8);
  }

  @media screen and (min-width:768px){
    .vertical-spread{
      grid-auto-rows: 19px;
    }
  }

  .vertical-spread>*{
    grid-column: 1;
    grid-row-start: -6;
    grid-row-end: span 8;
    z-index: 1;
  }
</style>
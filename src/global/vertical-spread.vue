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

  .vertical-spread>*{
    grid-column: 1;
    grid-row-start: -6;
    grid-row-end: span 8;
    z-index: 1;
  }
  .vertical-spread>*:first-child{
    grid-row-start: 1;
  }
</style>
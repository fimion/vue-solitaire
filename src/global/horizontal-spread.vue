<template>
  <div class="horizontal-spread">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "HorizontalSpread",
    methods:{
      addSpread(){
        let spread = 1
        this.$el.childNodes.forEach((e)=>{
          if(e.style) {
            e.style.gridColumnStart = spread
            spread++
          }
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
  .horizontal-spread{
    display:grid;
    grid-auto-columns: calc(var(--card-width) / 3);
  }

  @media screen and (min-width:768px){
    .horizontal-spread{
      grid-auto-columns: 33.33333px;
    }
  }

  .horizontal-spread>*{
    grid-row: 1;
    grid-column-end: span 3;
    z-index: 1;
  }
</style>
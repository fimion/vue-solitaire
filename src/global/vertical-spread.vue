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
        let spread = 1
        this.$el.childNodes.forEach((e)=>{
          e.style.gridRowStart = spread
          spread++
          if(e.classList.contains('face-up') && spread > 1) spread++
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
    grid-auto-rows: calc(var(--card-height) / 8);
  }

  @media screen and (min-width:768px){
    .vertical-spread{
      grid-auto-rows: 19px;
    }
  }

  .vertical-spread>*{
    grid-column: 1;
    grid-row-end: span 8;
    z-index: 1;
  }
</style>
<template>
    <canvas id="confetti"></canvas>
</template>

<script>
  import 'confetti-js'
  let confetti = null

  export default {
    name: "Confetti",
    methods: {
      confetti() {
        confetti = new ConfettiGenerator({
          target: 'confetti',
          props: [
            {type: 'svg', 'src': 'img/ClubIcon.svg', weight: 0.2},
            {type: 'svg', 'src': 'img/DiamondIcon.svg', weight: 0.2},
            {type: 'svg', 'src': 'img/HeartIcon.svg', weight: 0.2},
            {type: 'svg', 'src': 'img/SpadeIcon.svg', weight: 0.2},
            'circle',
            'square',
            'triangle',
            'line',
          ],
        })
        confetti.render()
      },
      clear(){
        confetti.clear()
      },
    },
    mounted() {
      this.$nextTick(this.confetti)
    },
    beforeUpdate(){
      this.clear()
    },
    updated(){
      this.$nextTick(this.confetti)
    },
    beforeDestroy() {
      this.clear()
    },
  }
</script>
<style>
  #portal {
    z-index: 2;
  }
</style>
<style scoped>
  #confetti {
    height: 100vh;
    width: 100vw;
    background-color: transparent;
  }
</style>
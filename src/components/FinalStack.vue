<template>
  <card-stack>
    <card-holder >
      <base-svg>
        <text class="placeholder"
            x="20"
            y="1em"
            dy="10">
          {{symbol}}
        </text>
      </base-svg>
    </card-holder>
  </card-stack>
</template>

<script>
  import {SUIT_SYMBOLS} from "^/constants.js"
  export default {
    name: "FinalStack",
    computed:{
      symbol(){
        return SUIT_SYMBOLS[this.suit]
      },
    },
    props:{
      suit:{
        type:String,
        required:true,
      },
    },
  }
</script>

<style scoped>
text.placeholder{
  fill:var(--color-white);
  font-size: 2.5em;
}
</style>
<template>
  <card-stack>
    <card-holder disabled>
      <base-svg>
        <text class="placeholder"
            x="20"
            y="110">
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
  font-size: 100px;
}
</style>
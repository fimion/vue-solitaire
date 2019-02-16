<template>
  <card-stack>
    <card-holder />
  </card-stack>
</template>

<script>
  export default {
    name: "FinalStack",
    prop:{
      suit:{
        type:String,
        required:true,
      },
    },
  }
</script>

<style scoped>

</style>
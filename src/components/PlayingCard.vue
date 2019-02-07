<template>
  <button class="playing-card"
          :aria-label="name"
          :class="color">
    {{rank}} {{symbol}}
  </button>
</template>

<script>
  export default {
    name: "PlayingCard",
    props:{
      card:{
        type:String,
        required:true,
      },
    },
    computed:{
      suit(){

        return this.card[1]
      },
      rank(){
        return this.card[0]
      },
      color(){
        return this.suit === 'H' || this.suit === 'D'? 'red' : 'black'
      },
      symbol(){
        return {
          'H':'♥',
          'D':'♦',
          'C':'♣',
          'S':'♠',
        }[this.suit]
      },
      name(){
        let suitnames = {
          'H':'Hearts',
          'D':'Diamonds',
          'C':'Clubs',
          'S':'Spades',
        },
          cardNames = {
            'A':'Ace',
            '2':'Two',
            '3':'Three',
            '4':'Four',
            '5':'Five',
            '6':'Six',
            '7':'Seven',
            '8':'Eight',
            '9':'Nine',
            'J':'Jack',
            'Q':'Queen',
            'K':'King',
          };


        return cardNames[this.rank]+' of '+suitnames[this.suit]
      },
    },
  }
</script>

<style scoped>
  .playing-card{
    font-size: 5rem;
    background-color:var(--color-white);
    border:var(--color-black) solid 2px;
    border-radius:0.5rem;
  }
  .red{
    color:var(--color-red);
  }
  .black{
    color:var(--color-black);
  }
</style>
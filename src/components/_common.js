export function finalStackTopCardMethod(stack){
      return this.$store.getters['final/'+stack+'/topCard']
    }

export function cardIsSelected(card){
    let selection = this.$store.state.currentSelection
    if(selection){
      return selection.cards.filter((c)=>c.card === card.card).length > 0
    }
    return false
}
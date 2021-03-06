import BaseSvg from './base-svg.vue'
import CardHolder from './card-holder.vue'
import CardStack from './card-stack.vue'
import NewGameButton from './new-game-button.vue'
import PlayingCard from './playing-card.vue'
import PopUp from './pop-up.vue'
import VerticalSpread from './vertical-spread.vue'


const globalComponents = {
  BaseSvg,
  CardHolder,
  CardStack,
  NewGameButton,
  PlayingCard,
  PopUp,
  VerticalSpread,
}

export default function addGlobalComponents(app){
  Object.keys(globalComponents).forEach((name)=>{
    app.component(name, globalComponents[name])
  })
}

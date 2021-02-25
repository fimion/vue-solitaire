import {CARD_SUITS} from "@src/constants.js"
import createFinalStack from "./_createFinalStack.js"

function makeFinalSlots(){
  let final = {}
  CARD_SUITS.forEach(e=>final[e]=createFinalStack())
  return final
}
export default {
  namespaced:true,
  modules: makeFinalSlots(),
  state:{
    stacks:CARD_SUITS,
  },
  getters:{},
  mutations:{},
  actions:{
    newGame({commit, state}){
      state.stacks.forEach((e)=>{
        commit(e+'/RESET_CARDS')
      })
    },
  },
}

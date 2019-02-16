import {CARD_SUITS} from "^/constants.js"
function makeFinalSlots(){
  let final = []
  CARD_SUITS.forEach(e=>final.push(e))
  return final
}
export default {
  namespaced:true,
  state:{
    stacks:makeFinalSlots(),
  },
  getters:{},
  mutations:{},
  actions:{},
}
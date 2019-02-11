import {PUSH_CARD} from "./_common.js"


export default {
  namespaced:true,
  state:{
    cards:[],
  },
  getters:{},
  mutations:{
    RESET_CARDS({cards}){
      cards.forEach(e=>{e.faceUp = false})
    },
    PUSH_CARD,
  },
  actions:{
    flopCard({commit}, newCard){
      commit('PUSH_CARD', newCard)
    },
  },
}
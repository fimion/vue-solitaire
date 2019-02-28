import {
  POP_CARD,
  PUSH_CARD,
  topCard,
    deckEmpty,
} from "^store/_common.js"

export default function(){
  return {
    namespaced:true,
    state:{
      cards:[],
    },
    getters:{
      topCard,
      deckEmpty,
    },
    mutations:{
      PUSH_CARD,
      POP_CARD,
    },
    actions:{
      pushCard({commit},cardArray){
        commit('PUSH_CARD', cardArray[0])
      },
    },
  }
}
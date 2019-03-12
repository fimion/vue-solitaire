import {
  CONCAT_CARDS,
  PUSH_CARD,
    topCard,
    RESET_CARDS,
} from "^store/_common.js"

export default function(){
  return {
    namespaced:true,
    state:{
      cards:[],
    },
    getters:{
      topCard,
    },
    mutations:{
      PUSH_CARD,
      CONCAT_CARDS,
      RESET_CARDS,
      SPLICE_CARDS(state, card){
        let index = state.cards.indexOf(card)
        state.cards.splice(index)
      },
      TOP_CARD_FACE_UP(state){
        state.cards[state.cards.length - 1].faceUp = true
      },
    },
    actions:{
      concatCards({commit},payload){
        commit('CONCAT_CARDS', payload)
      },
      spliceCards({commit, getters,state}, cards){
        commit('SPLICE_CARDS', cards[0])

        if(state.cards.length && !getters.topCard.faceUp){
          commit('TOP_CARD_FACE_UP')
        }
      },
    },
  }
}
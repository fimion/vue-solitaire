import {
  CONCAT_CARDS,
  PUSH_CARD,
    topCard,
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
    },
    actions:{
      concatCards({commit},payload){
        commit('CONCAT_CARDS', payload)
      },
    },
  }
}
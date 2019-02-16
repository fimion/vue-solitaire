import {
  CONCAT_CARDS,
  PUSH_CARD,
} from "^store/_common.js"

export default function(){
  return {
    namespaced:true,
    state:{
      cards:[],
    },
    getters:{

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
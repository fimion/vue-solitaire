import {CONCAT_CARDS} from "./_common.js"


export default {
  namespaced:true,
  state:{
    cards:[],
    flop:[],
  },
  getters:{},
  mutations:{
    RESET_CARDS({cards}){
      cards.forEach(e=>{e.faceUp = false})
    },
    FLOP_CARDS(state,payload){
      state.flop = payload
    },
    CONCAT_CARDS,
  },
  actions:{
    flopCards({commit,state}, newCards){
      commit('CONCAT_CARDS', state.flop)
      commit('FLOP_CARDS', newCards)
    },
  },
}
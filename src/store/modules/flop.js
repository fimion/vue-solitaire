import {CONCAT_CARDS} from "./_common.js"
import Vue from 'vue'

export default {
  namespaced:true,
  state:{
    cards:[],
    flop:[],
  },
  getters:{},
  mutations:{
    SET_CARDS_FACE_DOWN({cards}){
      cards.forEach(e=>{e.faceUp = false})
    },
    REVERSE_CARDS({cards}){
      cards.reverse()
    },
    RESET_CARDS(state){
      state.cards = []
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
    returnDeckPromise({commit, state}){
      commit('CONCAT_CARDS', state.flop)
      commit('FLOP_CARDS',[])
      commit('SET_CARDS_FACE_DOWN')
      commit('REVERSE_CARDS')
      let deck = state.cards
      commit('RESET_CARDS')
      return Promise.resolve(deck)
    },
  },
}
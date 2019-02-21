import Vue from "vue"
import Vuex from "vuex"
import deck from './modules/deck.js'
import flop from './modules/flop.js'
import final from './modules/final/index.js'
import play from './modules/play/index.js'
Vue.use(Vuex)





export default new Vuex.Store({
  modules:{
    deck,
    flop,
    final,
    play,
  },
  state: {
    currentSelection:null,
  },
  getters:{
    selectedCard(state){
      if(state.currentSelection && state.currentSelection.cards.length){
        return state.currentSelection.cards[0]
      }
      return null
    },
  },
  mutations: {
    SET_SELECTED_CARDS(state, payload){
      state.currentSelection = payload
    },
  },
  actions: {
    preInit({commit, dispatch}){
      dispatch('deck/shuffleDeck')
    },
    postInit({commit, dispatch}){
      dispatch('play/initPlayArea')
    },
    selectCards({commit, dispatch}, Selection){
      commit('SET_SELECTED_CARDS', Selection)
    },
    async moveCards({commit, dispatch, state, getters}, Action){
      if(state.currentSelection){
        if(Action.validate(getters.selectedCard)){
          await dispatch(Action.action, state.currentSelection.cards)
          await dispatch(state.currentSelection.cleanUp)
          commit('SET_SELECTED_CARDS', null)
        }
      }else{
        await dispatch(Action.action)
      }
    },
  },
})

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
    appUpdated:false,
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
    APP_UPDATED(state){
      state.appUpdated = true
    },
    APP_LOADED(state){
      state.appUpdated = false
    },
  },
  actions: {
    preInit({commit, dispatch}){
      dispatch('deck/shuffleDeck')
      commit('APP_LOADED')
    },
    postInit({commit, dispatch}){
      dispatch('play/initPlayArea')
    },
    selectCards({commit, dispatch}, Selection){
      commit('SET_SELECTED_CARDS', Selection)
    },
    async moveCards({commit, dispatch, state, getters}, Action){
      if(state.currentSelection){
        if(Action.validate(state.currentSelection)){
          await dispatch(Action.action, state.currentSelection.cards)
          if(state.currentSelection.cleanUp){
            await dispatch(state.currentSelection.cleanUp, state.currentSelection.cards)
          }
        }
        commit('SET_SELECTED_CARDS', null)
      }else{

      }
    },
    appUpdated({commit}){
      commit('APP_UPDATED')
    },
  },
})

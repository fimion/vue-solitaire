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
  state: {},
  mutations: {},
  actions: {
    preInit({commit, dispatch}){
      dispatch('deck/shuffleDeck')
    },
    postInit({commit, dispatch}){
      dispatch('play/initPlayArea')
    },
  },
})

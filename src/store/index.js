import Vue from "vue"
import Vuex from "vuex"
import deck from './modules/deck.js'
import flop from './modules/flop.js'
import final from './modules/final.js'
import play from './modules/play.js'
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
  actions: {},
})

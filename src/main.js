import Vue from "vue"
import store from "@store"
import '@global'
import "./registerServiceWorker"

import DeckArea from "@components/DeckArea"
import FlopArea from "@components/FlopArea"

Vue.config.productionTip = false;




(function(){

  store.dispatch('deck/shuffleDeck')

  let apps = [
    {
      el:"#deck",
      store,
      render: h => h(DeckArea),
    },
    {
      el:"#flop",
      store,
      render: h => h(FlopArea),
    },
  ]
  apps.forEach(e=>{
    new Vue(e)
  })
})()



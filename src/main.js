import Vue from "vue"
import store from "^store"
import '^global'
import "./registerServiceWorker"

import DeckArea from "^components/DeckArea"
import FlopArea from "^components/FlopArea"
import FinalArea from "^components/FinalArea"
import PlayArea from "^components/PlayArea"

Vue.config.productionTip = false




;(function(){

  store.dispatch('preInit')

  let apps = [
    {
      el:"#deck",
      render: h => h(DeckArea),
    },
    {
      el:"#flop",
      render: h => h(FlopArea),
    },
    {
      el:"#final",
      render: h => h(FinalArea),
    },
    {
      el:"#play",
      render: h => h(PlayArea),
    },
  ]
  apps.forEach(e=>{
    if(document.querySelector(e.el)){
      e.store = store
      new Vue(e)
    }
  })

  store.dispatch('postInit')
})()



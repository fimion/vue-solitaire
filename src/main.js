import Vue from "vue"
import store from "^store"
import '^global'
import "./registerServiceWorker"

import HeaderArea from "^components/HeaderArea"

const DeckArea = ()=>import("^components/DeckArea")
const FlopArea = ()=>import("^components/FlopArea")
const FinalArea = ()=>import("^components/FinalArea")
const PlayArea = ()=>import("^components/PlayArea")

/**
 *
 * This Main.js file demonstrates a pattern that allows for easy Vue
 * Integration into other systems. Each Area has a Vue instance that
 * can talk to other instances via the store. By using a dynamic
 * import, if the mounting element can't be found, then the js file for
 * the Area component won't load. This can be used to only load certain
 * components on certain pages.
 *
 */

Vue.config.productionTip = false

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
  {
    el:"#header",
    render: h => h(HeaderArea),
  },
]
apps.forEach(e=>{
  if(document.querySelector(e.el)){
    e.store = store
    new Vue(e)
  }
})

store.dispatch('postInit')




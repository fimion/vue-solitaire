import Vue from "vue"
import store from "@store"
import '@global'
import "@/registerServiceWorker.js"

import HeaderArea from "@components/HeaderArea.vue"
import PortalVue from 'portal-vue'
import FixedArea from '@components/FixedArea.vue'
Vue.use(PortalVue)

const DeckArea = ()=>import("@components/DeckArea.vue")
const FlopArea = ()=>import("@components/FlopArea.vue")
const FinalArea = ()=>import("@components/FinalArea.vue")
const PlayArea = ()=>import("@components/PlayArea.vue")

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
    name:'deck-root',
    render: h => h(DeckArea),
  },
  {
    el:"#flop",
    name:'flop-root',
    render: h => h(FlopArea),
  },
  {
    el:"#final",
    name:'final-root',
    render: h => h(FinalArea),
  },
  {
    el:"#play",
    name:'play-root',
    render: h => h(PlayArea),
  },
  {
    el:"#header",
    name:'header-root',
    render: h => h(HeaderArea),
  },
  {
    el:"#portal",
    name:'fixed-area',
    render: h => h(FixedArea),
  },
]
apps.forEach(e=>{
  if(document.querySelector(e.el)){
    e.store = store
    new Vue(e)
  }
})

store.dispatch('postInit')




import {createApp} from "vue"
import store from "@store"
import addGlobalComponents from '@global'
import "@/registerServiceWorker.js"

import HeaderArea from "@components/HeaderArea.vue"
import FixedArea from '@components/FixedArea.vue'

import DeckArea from "@components/DeckArea.vue"
import FlopArea from "@components/FlopArea.vue"
import FinalArea from "@components/FinalArea.vue"
import PlayArea from "@components/PlayArea.vue"

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

store.dispatch('preInit')

let apps = [
  {
    el:"#deck",
    component: DeckArea,
  },
  {
    el:"#flop",
    component: FlopArea,
  },
  {
    el:"#final",
    component: FinalArea,
  },
  {
    el:"#play",
    component: PlayArea,
  },
  {
    el:"#header",
    component: HeaderArea,
  },
]
apps.forEach(({el, component})=>{
  if(document.querySelector(el)){
    const app = createApp(component)
    addGlobalComponents(app)
    app.use(store)
    app.mount(el)
  }
})

store.dispatch('postInit')




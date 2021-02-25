import {createApp, defineAsyncComponent} from "vue"
import store from "@store/index.js"
import addGlobalComponents from '@global/index.js'
import "./registerServiceWorker.js"

import HeaderArea from "@components/HeaderArea.vue"

/**
 *
 * @param {string} name - component name for dev tools
 * @param {function} loader - function that returns a promise that resolves to a component
 * @returns {object} a component definition that will allow for async loading.
 */
function asyncComponent(name, loader){
  const component = defineAsyncComponent({
    loader,
  })
  component.name = `Async${name}`
  return component
}


const DeckApp = asyncComponent('DeckApp', ()=>import("@components/DeckArea.vue"))
const FlopApp = asyncComponent("FlopApp",()=>import("@components/FlopArea.vue"))
const FinalApp = asyncComponent("FinalApp", ()=>import("@components/FinalArea.vue"))
const PlayApp = asyncComponent("PlayApp",()=>import("@components/PlayArea.vue"))

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
    component: DeckApp,
  },
  {
    el:"#flop",
    component: FlopApp,
  },
  {
    el:"#final",
    component: FinalApp,
  },
  {
    el:"#play",
    component: PlayApp,
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


if(process.env.NODE_ENV !== 'production'){
  import('./devHelpers.js')
}



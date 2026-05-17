import {type VaporComponent, createVaporApp, defineVaporAsyncComponent} from "vue";
import pinia, { useGameStore } from "@stores/index.js";
import addGlobalComponents from "@global/index.js";
import "./registerServiceWorker.js";

/**
 *
 * @param name - component name for dev tools
 * @param loader - function that returns a promise that resolves to a component
 * @returns a component definition that will allow for async loading.
 */
function asyncComponent(name: string, loader: () => Promise<VaporComponent>) {
  const component = defineVaporAsyncComponent({
    loader,
  });
  component.name = name;
  return component;
}

const HeaderApp = asyncComponent(
    "HeaderArea",
    ()=> import('@components/HeaderArea.vue') as Promise<VaporComponent>
);

const DeckApp = asyncComponent(
  "DeckArea",
  () => import("@components/DeckArea.vue") as Promise<VaporComponent>,
);
const FlopApp = asyncComponent(
  "FlopArea",
  () => import("@components/FlopArea.vue") as Promise<VaporComponent>,
);
const FinalApp = asyncComponent(
  "FinalArea",
  () => import("@components/FinalArea.vue") as Promise<VaporComponent>,
);
const PlayApp = asyncComponent(
  "PlayArea",
  () => import("@components/PlayArea.vue") as Promise<VaporComponent>,
);

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

const apps = [
  {
    el: "#deck",
    name: "DeckApp",
    component: DeckApp,
  },
  {
    el: "#flop",
    name: "FlopApp",
    component: FlopApp,
  },
  {
    el: "#final",
    name: "FinalApp",
    component: FinalApp,
  },
  {
    el: "#play",
    name: "PlayApp",
    component: PlayApp,
  },
  {
    el: "#header",
    name: "HeaderApp",
    component: HeaderApp,
  },
];
apps.forEach(({ el, component }) => {
  if (document.querySelector(el)) {
    const app = createVaporApp(component as VaporComponent);
    addGlobalComponents(app);
    app.use(pinia);
    app.mount(el);
  }
});

const gameStore = useGameStore();
gameStore.preInit();

if (!import.meta.env.PROD) {
  import("./devHelpers.js");
}


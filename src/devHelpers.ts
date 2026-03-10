import {createVaporApp, VaporComponent} from "vue";
import store from "@store";
import addGlobalComponents from "@global";
import DevTools from "@components/DevTools.vue";

const devToolsElement = document.createElement("div");
devToolsElement.id = "dev-tools";
document.body.append(devToolsElement);

const devToolsApp = createVaporApp(DevTools as VaporComponent);
addGlobalComponents(devToolsApp);
devToolsApp.use(store);
devToolsApp.mount(devToolsElement);

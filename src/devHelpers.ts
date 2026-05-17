import {createVaporApp, VaporComponent} from "vue";
import pinia from "@stores/index.js";
import addGlobalComponents from "@global/index.js";
import DevTools from "@components/DevTools.vue";

const devToolsElement = document.createElement("div");
devToolsElement.id = "dev-tools";
document.body.append(devToolsElement);

const devToolsApp = createVaporApp(DevTools as VaporComponent);
addGlobalComponents(devToolsApp);
devToolsApp.use(pinia);
devToolsApp.mount(devToolsElement);

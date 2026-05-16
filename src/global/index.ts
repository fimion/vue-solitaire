import {defineVaporAsyncComponent, type App} from "vue";

const BaseModal = defineVaporAsyncComponent(()=>import("./base-modal.vue"));
const BaseSvg = defineVaporAsyncComponent(()=>import("./base-svg.vue"));
const CardHolder = defineVaporAsyncComponent(()=>import("./card-holder.vue"));
const CardStack = defineVaporAsyncComponent(()=>import("./card-stack.vue"));
const NewGameButton = defineVaporAsyncComponent(()=>import("./new-game-button.vue"));
const PlayingCard = defineVaporAsyncComponent(()=>import("./playing-card.vue"));
const VerticalSpread = defineVaporAsyncComponent(()=>import("./vertical-spread.vue"));

const globalComponents = {
  BaseModal,
  BaseSvg,
  CardHolder,
  CardStack,
  NewGameButton,
  PlayingCard,
  VerticalSpread,
};

export default function addGlobalComponents(app: App) {
  Object.entries(globalComponents).forEach(([name, component]) => {
    app.component(name, component);
  });
}

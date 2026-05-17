import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();

function migratePersistedState(){

  const vuexString = localStorage.getItem("vuex");

  if(vuexString){
    const vuexData = JSON.parse(vuexString);
    const deckData = {
      ...vuexData.deck,
      ...vuexData.options
    };
    const finalData = {
      stacks: {
        C: vuexData.final.C.cards,
        D: vuexData.final.D.cards,
        H: vuexData.final.H.cards,
        S: vuexData.final.S.cards,
      }
    };
    const flopData = {
      ...vuexData.flop,
    };
    const gameData = {
      appUpdated: vuexData.appUpdated,
    }
    const playData = {
      ready: vuexData.play.ready,
      stacks: Object.entries(vuexData.play).reduce((acc, [key, value]) => {
        if(Number(key) >= 0 && Number(key) <= 6){
          // @ts-expect-error this is in fact how this is stored
          acc[key] = value?.cards ?? [];
        }
        return acc;
      }, [])
    };
    localStorage.setItem("deck", JSON.stringify(deckData));
    localStorage.setItem("final", JSON.stringify(finalData));
    localStorage.setItem("flop", JSON.stringify(flopData));
    localStorage.setItem("game", JSON.stringify(gameData));
    localStorage.setItem("play", JSON.stringify(playData));
    localStorage.removeItem("vuex");
  }

  return createPersistedState();
}
pinia.use(migratePersistedState());

export default pinia;

export { useGameStore } from "./game.js";
export { useDeckStore } from "./deck.js";
export { useFlopStore } from "./flop.js";
export { useFinalStore } from "./final.js";
export { usePlayStore } from "./play.js";

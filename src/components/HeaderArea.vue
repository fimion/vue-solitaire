<script setup vapor lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import DefaultCardFaces from "@template/card-faces/default-card-faces.vue";
import NewGameButton from "@global/new-game-button.vue";
import BaseModal from "@global/base-modal.vue";

const store = useStore();

const options = computed(() => store.state.options);
const appUpdated = computed(() => store.state.appUpdated);

const cardsDrawn = computed({
  get() {
    return options.value.cardsDrawn;
  },
  set(value) {
    const confirm = globalThis.confirm(
      "Changing this setting will deal a new game. Are you sure?",
    );
    if (confirm) {
      store.dispatch("setCardsDrawn", value);
    } else {
      store.commit("SET_CARDS_DRAWN", options.value.cardsDrawn);
      // Removed this.$forceUpdate() as computed properties handle reactivity correctly.
    }
  },
});

</script>
<template>
  <div class="github">
    <a href="https://github.com/fimion/vue-solitaire/">View this on Github</a>
  </div>
  <default-card-faces />
  <div v-if="appUpdated" class="app-updated">
    There is an update! Refresh to load the new version.
  </div>
  <div class="buttons">
    <base-modal>
      <template #activator-text>New</template>
      <form method="dialog">
        <h1>Start A New Game</h1>
        <p>Are you sure you want to start a new game?</p>
        <new-game-button/>
        <button>
          Do Not Start a New Game
        </button>
      </form>
    </base-modal>
    <base-modal>
      <template #activator-text>Options</template>
      <form method="dialog">
        <h1>Options</h1>
        <p>Options save automatically</p>
        <label for="cardsDrawn">Number of cards drawn at a time: </label>
        <select id="cardsDrawn" v-model="cardsDrawn" name="cardsDrawn">
          <option :value="1">One</option>
          <option :value="3">Three</option>
        </select>
        <div>
          <button>Close Options</button>
        </div>
      </form>
    </base-modal>
  </div>
</template>
<style scoped>
a,
a:hover,
a:visited,
a:focus,
a:active {
  color: var(--color-white);
  text-decoration: none;
}

.github {
}
</style>
<style>
#header {
  display: flex;
  flex-flow: row-reverse nowrap;
  color: var(--color-white);
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  max-width: 780px;
  width: 100%;
}
</style>

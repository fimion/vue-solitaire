<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import DefaultCardFaces from "@template/card-faces/default-card-faces.vue";
import NewGameButton from "@global/new-game-button.vue";
import PopUp from "@global/pop-up.vue";

const store = useStore();

const showOptions = ref(false);
const showNewConfirm = ref(false);

const options = computed(() => store.state.options);
const appUpdated = computed(() => store.state.appUpdated);

const cardsDrawn = computed({
  get() {
    return options.value.cardsDrawn;
  },
  set(value) {
    let confirm = window.confirm(
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

function startGame() {
  showNewConfirm.value = false;
  // wait, wait... missing newGame. Let's export it or mapAction manually.
  // Actually, newGame was a mapped action but not used in the template here? Wait, `new-game-button` emts `confirm`.
  // It triggers `@confirm="startGame"`. startGame sets showNewConfirm = false;
}
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
    <button class="btn" @click="showNewConfirm = true">
      New
      <teleport v-if="showNewConfirm" to="#portal">
        <pop-up>
          <div>Are you sure you want to start a new game?</div>
          <new-game-button class="btn" @confirm="startGame" />
          <button class="btn" @click="showNewConfirm = false">
            Do Not Start a New Game
          </button>
          <button
            class="close"
            aria-label="Close New Game Dialogue"
            @click="showNewConfirm = false"
          >
            X
          </button>
        </pop-up>
      </teleport>
    </button>
    <!--<button class="btn">Undo</button>-->
    <button aria-label="Options" class="btn" @click="showOptions = true">
      Opts
      <teleport v-if="showOptions" to="#portal">
        <pop-up>
          <div>
            <label for="cardsDrawn">Number of cards drawn at a time: </label>
            <select id="cardsDrawn" v-model="cardsDrawn" name="cardsDrawn">
              <option :value="1">One</option>
              <option :value="3">Three</option>
            </select>
          </div>
          <button
            class="close"
            aria-label="Close New Game Dialogue"
            @click="showOptions = false"
          >
            X
          </button>
        </pop-up>
      </teleport>
    </button>
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

.btn {
  padding: 5px;
  margin-right: 5px;

  background-color: var(--color-btn);
  border-color: var(--color-btn-border);
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
  min-width: 20px;
  background: none;
  border: 1px solid var(--color-black);
  border-radius: 50%;
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

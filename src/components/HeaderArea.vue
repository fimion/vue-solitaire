<script>
import { mapState, mapActions } from "vuex";
import DefaultCardFaces from "@template/card-faces/default-card-faces.vue";

export default {
  name: "HeaderArea",
  components: {
    DefaultCardFaces,
  },
  data() {
    return {
      showOptions: false,
      showNewConfirm: false,
    };
  },
  computed: {
    cardsDrawn: {
      get() {
        return this.options.cardsDrawn;
      },
      set(value) {
        let confirm = window.confirm(
          "Changing this setting will deal a new game. Are you sure?",
        );
        if (confirm) {
          this.$store.dispatch("setCardsDrawn", value);
        } else {
          this.$store.commit("SET_CARDS_DRAWN", this.options.cardsDrawn);
          this.$forceUpdate();
        }
      },
    },
    ...mapState(["appUpdated", "options"]),
  },
  methods: {
    startGame() {
      this.showNewConfirm = false;
    },
    ...mapActions(["newGame"]),
  },
};
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

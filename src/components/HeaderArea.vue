<script setup vapor lang="ts">
import { computed, ref } from "vue";
import { useDeckStore } from "@stores/deck.js";
import { useGameStore } from "@stores/game.js";
import { buildShareUrl, parseSeedFromSearch } from "@src/utils/shuffle.js";
import DefaultCardFaces from "@template/card-faces/default-card-faces.vue";
import NewGameButton from "@global/new-game-button.vue";
import BaseModal from "@global/base-modal.vue";

const deckStore = useDeckStore();
const gameStore = useGameStore();

const appUpdated = computed(() => gameStore.appUpdated);
const currentSeed = computed(() => deckStore.seed ?? undefined);
const shareUrl = computed(() =>
  buildShareUrl(globalThis.location?.href ?? "http://localhost/", deckStore.seed),
);
const copied = ref(false);

async function copyShareLink() {
  await globalThis.navigator?.clipboard?.writeText(shareUrl.value);
  copied.value = true;
}

function resetCopied() {
  copied.value = false;
}

const invitedSeed = ref<bigint | null>(parseSeedFromSearch(globalThis.location?.search ?? ""));

function clearSeedFromUrl() {
  if (!globalThis.location || !globalThis.history?.replaceState) return;
  const url = new URL(globalThis.location.href);
  if (url.searchParams.has("seed")) {
    url.searchParams.delete("seed");
    globalThis.history.replaceState({}, "", url);
  }
}

const cardsDrawn = computed({
  get() {
    return deckStore.cardsDrawn;
  },
  set(value) {
    const confirm = globalThis.confirm("Changing this setting will deal a new game. Are you sure?");
    gameStore.setCardsDrawn(confirm ? value : deckStore.cardsDrawn);
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
        <new-game-button />
        <button>Do Not Start a New Game</button>
      </form>
    </base-modal>
    <base-modal>
      <template #activator-text>Replay</template>
      <form method="dialog">
        <h1>Replay Current Game</h1>
        <p>Are you sure you want to restart the current game?</p>
        <new-game-button :seed="currentSeed"> Replay Game </new-game-button>
        <button>Do Not Replay Game</button>
      </form>
    </base-modal>
    <base-modal @close="resetCopied">
      <template #activator-text>Share</template>
      <form method="dialog">
        <h1>Share Current Game</h1>
        <p>Share this link to play game {{ currentSeed }}:</p>
        <p>
          <input
            type="text"
            readonly
            :value="shareUrl"
            aria-label="Shareable game link"
            class="share-url-input"
          />
        </p>
        <button type="button" @click="copyShareLink">
          {{ copied ? "Copied!" : "Copy Link" }}
        </button>
        <button>Close</button>
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
    <base-modal v-if="invitedSeed !== null" default-open @close="clearSeedFromUrl">
      <template #activator>
        <span><!-- Intentionally left blank --></span>
      </template>
      <form method="dialog">
        <h1>Start Seeded Game</h1>
        <p>
          You've been invited to play game {{ invitedSeed }}. Would you like to start a new game
          with that seed?
        </p>
        <new-game-button :seed="invitedSeed" @confirm="clearSeedFromUrl">
          Start New Game
        </new-game-button>
        <button @click="clearSeedFromUrl">Do Not Start a New Game</button>
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

.share-url-input {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
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
  box-sizing: border-box;
}
</style>

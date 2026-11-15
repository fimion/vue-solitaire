import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createVaporApp, type VaporComponent } from "vue";
import { createPinia, setActivePinia } from "pinia";
import addGlobalComponents from "@global/index.js";
import FinalArea from "./FinalArea.vue";
import PlayArea from "./PlayArea.vue";
import { useFinalStore } from "@stores/final.js";
import { usePlayStore } from "@stores/play.js";
import { useGameStore } from "@stores/game.js";

describe("FinalStack to PlayStack card movement (seed 999)", () => {
  let finalHost: HTMLElement;
  let playHost: HTMLElement;
  let portalHost: HTMLElement;
  let finalApp: ReturnType<typeof createVaporApp> | null = null;
  let playApp: ReturnType<typeof createVaporApp> | null = null;

  beforeEach(() => {
    finalHost = document.createElement("div");
    finalHost.id = "final";
    playHost = document.createElement("div");
    playHost.id = "play";
    portalHost = document.createElement("div");
    portalHost.id = "portal";
    document.body.append(finalHost, playHost, portalHost);
  });

  afterEach(() => {
    finalApp?.unmount();
    playApp?.unmount();
    finalApp = null;
    playApp = null;
    finalHost.remove();
    playHost.remove();
    portalHost.remove();
  });

  function mountBoard() {
    const pinia = createPinia();
    setActivePinia(pinia);

    finalApp = createVaporApp(FinalArea as VaporComponent);
    addGlobalComponents(finalApp);
    finalApp.use(pinia);
    finalApp.mount(finalHost);

    playApp = createVaporApp(PlayArea as VaporComponent);
    addGlobalComponents(playApp);
    playApp.use(pinia);
    playApp.mount(playHost);

    return {
      finalStore: useFinalStore(pinia),
      playStore: usePlayStore(pinia),
      gameStore: useGameStore(pinia),
    };
  }

  it("moves A♠ to the Spades final stack and back onto 2♦ in play stack 3 using seed 999", async () => {
    const { finalStore, playStore, gameStore } = mountBoard();

    // Deal seed 999 (stack 3 top card: 2♦, stack 6 top card: A♠)
    await gameStore.newGame(999n);

    // 1. Double-click A♠ on play stack 6 to move it to the Spades final stack
    const playAceBtn = await vi.waitFor(() => {
      const btn = playHost.querySelector(
        'button[aria-label="Ace of Spades"]',
      ) as HTMLButtonElement | null;
      expect(btn).not.toBeNull();
      return btn!;
    });
    playAceBtn.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));

    await vi.waitFor(() => {
      expect(finalStore.stacks.S.map((c) => c.card)).toEqual(["AS"]);
    });

    // 2. Click A♠ on the Spades final stack to select it
    const finalAceBtn = await vi.waitFor(() => {
      const btn = finalHost.querySelector(
        'button[aria-label="Ace of Spades"]',
      ) as HTMLButtonElement | null;
      expect(btn).not.toBeNull();
      return btn!;
    });
    finalAceBtn.click();

    await vi.waitFor(() => {
      expect(gameStore.selectedCard?.card).toBe("AS");
      expect(finalAceBtn.classList.contains("selected")).toBe(true);
    });

    // 3. Click 2♦ on play stack 3 to move A♠ from the Spades final stack onto 2♦
    const twoOfDiamondsBtn = await vi.waitFor(() => {
      const btn = playHost.querySelector(
        'button[aria-label="Two of Diamonds"]',
      ) as HTMLButtonElement | null;
      expect(btn).not.toBeNull();
      return btn!;
    });
    twoOfDiamondsBtn.click();

    await vi.waitFor(() => {
      expect(finalStore.stacks.S).toHaveLength(0);
      expect(
        playStore.stacks[3].slice(-2).map((c) => c.card),
      ).toEqual(["2D", "AS"]);
      expect(gameStore.selectedCard).toBeNull();
    });
  });

  it("clears selection and does not move A♠ from the final stack when clicking an invalid play stack card in seed 999", async () => {
    const { finalStore, playStore, gameStore } = mountBoard();

    await gameStore.newGame(999n);

    // Move A♠ to the Spades final stack
    const playAceBtn = await vi.waitFor(() => {
      const btn = playHost.querySelector(
        'button[aria-label="Ace of Spades"]',
      ) as HTMLButtonElement | null;
      expect(btn).not.toBeNull();
      return btn!;
    });
    playAceBtn.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));

    const finalAceBtn = await vi.waitFor(() => {
      const btn = finalHost.querySelector(
        'button[aria-label="Ace of Spades"]',
      ) as HTMLButtonElement | null;
      expect(btn).not.toBeNull();
      return btn!;
    });
    finalAceBtn.click();
    expect(gameStore.selectedCard?.card).toBe("AS");

    // Click 9♦ on play stack 0 (invalid target for A♠)
    const nineOfDiamondsBtn = await vi.waitFor(() => {
      const btn = playHost.querySelector(
        'button[aria-label="Nine of Diamonds"]',
      ) as HTMLButtonElement | null;
      expect(btn).not.toBeNull();
      return btn!;
    });
    nineOfDiamondsBtn.click();

    expect(finalStore.stacks.S.map((c) => c.card)).toEqual(["AS"]);
    expect(playStore.stacks[0].map((c) => c.card)).toEqual(["9D"]);
    expect(gameStore.selectedCard).toBeNull();
  });
});

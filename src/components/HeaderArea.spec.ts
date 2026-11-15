import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createVaporApp, type VaporComponent } from "vue";
import { createPinia, setActivePinia } from "pinia";
import addGlobalComponents from "@global/index.js";
import HeaderArea from "./HeaderArea.vue";
import { useDeckStore } from "@stores/deck.js";
import { usePlayStore } from "@stores/play.js";

describe("HeaderArea browser integration", () => {
  let hostEl: HTMLElement;
  let app: ReturnType<typeof createVaporApp> | null = null;

  beforeEach(() => {
    hostEl = document.createElement("header");
    hostEl.id = "header";
    document.body.append(hostEl);
  });

  afterEach(() => {
    app?.unmount();
    app = null;
    hostEl.remove();
    const url = new URL(window.location.href);
    url.searchParams.delete("seed");
    window.history.replaceState({}, "", url);
  });

  function mountHeader() {
    const pinia = createPinia();
    setActivePinia(pinia);
    app = createVaporApp(HeaderArea as VaporComponent);
    addGlobalComponents(app);
    app.use(pinia);
    app.mount(hostEl);
    return {
      deckStore: useDeckStore(pinia),
      playStore: usePlayStore(pinia),
    };
  }

  it("renders the Replay button and replays the current game seed when confirmed", async () => {
    const { deckStore, playStore } = mountHeader();

    // Start an initial game with seed 55555
    deckStore.newGame(55555);
    await playStore.initPlayArea();

    const initialDeck = deckStore.cards.map((c) => c.card);
    const initialStacks = playStore.stacks.map((s) => s.map((c) => c.card));

    // Mutate state
    deckStore.popCard();
    playStore.stacks[0] = [];

    // Click the Replay activator button to open the native <dialog>
    const buttons = Array.from(hostEl.querySelectorAll("button"));
    const replayActivator = buttons.find((b) => b.textContent?.trim() === "Replay");
    expect(replayActivator).toBeDefined();
    replayActivator!.click();

    const replayConfirmBtn = buttons.find(
      (b) => b.textContent?.trim() === "Replay Game",
    );
    expect(replayConfirmBtn).toBeDefined();
    replayConfirmBtn!.click();

    // Wait for async playStore.initPlayArea() to finish dealing
    await vi.waitFor(() => {
      expect(playStore.ready).toBe(true);
    });

    expect(deckStore.seed).toBe(55555n);
    expect(deckStore.cards.map((c) => c.card)).toEqual(initialDeck);
    expect(playStore.stacks.map((s) => s.map((c) => c.card))).toEqual(
      initialStacks,
    );
  });

  it("opens the invitation modal when ?seed= is in the URL and starts that seeded game on confirm", async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("seed", "777777");
    window.history.replaceState({}, "", url);

    const { deckStore, playStore } = mountHeader();

    // Wait for watchOnce in BaseModal to open the dialog
    await vi.waitFor(() => {
      expect(hostEl.textContent).toContain(
        "You've been invited to play game 777777. Would you like to start a new game with that seed?",
      );
    });

    const buttons = Array.from(hostEl.querySelectorAll("button"));
    const startSeededBtn = buttons.find(
      (b) => b.textContent?.trim() === "Start New Game",
    );
    expect(startSeededBtn).toBeDefined();
    startSeededBtn!.click();

    await vi.waitFor(() => {
      expect(playStore.ready).toBe(true);
    });

    expect(deckStore.seed).toBe(777777n);
    expect(new URLSearchParams(window.location.search).has("seed")).toBe(false);
  });

  it("opens the Share dialog with the current seed link and copies it to the clipboard", async () => {
    const { deckStore } = mountHeader();
    deckStore.newGame(314159);

    const writeTextSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();

    const buttons = Array.from(hostEl.querySelectorAll("button"));
    const shareActivator = buttons.find(
      (b) => b.textContent?.trim() === "Share",
    );
    expect(shareActivator).toBeDefined();
    shareActivator!.click();

    await vi.waitFor(() => {
      const input = hostEl.querySelector(
        ".share-url-input",
      ) as HTMLInputElement | null;
      expect(input?.value).toContain("seed=314159");
    });

    const copyBtn = Array.from(hostEl.querySelectorAll("button")).find(
      (b) => b.textContent?.trim() === "Copy Link",
    );
    expect(copyBtn).toBeDefined();
    copyBtn!.click();

    await vi.waitFor(() => {
      expect(writeTextSpy).toHaveBeenCalledWith(
        expect.stringContaining("seed=314159"),
      );
      expect(copyBtn!.textContent?.trim()).toBe("Copied!");
    });

    writeTextSpy.mockRestore();
  });
});

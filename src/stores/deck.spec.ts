import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useDeckStore } from "./deck.js";
import { useGameStore } from "./game.js";
import { usePlayStore } from "./play.js";

describe("useDeckStore & useGameStore 64-bit seeded shuffles", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("deals a predictable deck when a 64-bit seed is provided", () => {
    const deckStore = useDeckStore();

    deckStore.newGame(424242n);
    const firstDeal = deckStore.cards.map((c) => c.card);
    expect(deckStore.seed).toBe(424242n);

    deckStore.newGame(999999n);
    expect(deckStore.cards.map((c) => c.card)).not.toEqual(firstDeal);

    deckStore.newGame(424242);
    expect(deckStore.seed).toBe(424242n);
    expect(deckStore.cards.map((c) => c.card)).toEqual(firstDeal);
  });

  it("generates and stores a 64-bit bigint seed when none is provided", () => {
    const deckStore = useDeckStore();

    deckStore.newGame();
    expect(typeof deckStore.seed).toBe("bigint");
    expect(deckStore.cards).toHaveLength(52);
  });

  it("replays the current game with the exact same play stacks and deck", async () => {
    const gameStore = useGameStore();
    const deckStore = useDeckStore();
    const playStore = usePlayStore();

    await gameStore.newGame(1337n);
    const initialSeed = deckStore.seed;
    const initialDeckOrder = deckStore.cards.map((c) => c.card);
    const initialStacksOrder = playStore.stacks.map((stack) =>
      stack.map((c) => ({ card: c.card, faceUp: c.faceUp })),
    );

    // Mutate state during gameplay
    deckStore.popCard();
    playStore.stacks[0] = [];

    // Replay the game
    await gameStore.replayGame();

    expect(deckStore.seed).toBe(initialSeed);
    expect(deckStore.cards.map((c) => c.card)).toEqual(initialDeckOrder);
    expect(
      playStore.stacks.map((stack) =>
        stack.map((c) => ({ card: c.card, faceUp: c.faceUp })),
      ),
    ).toEqual(initialStacksOrder);
  });
});

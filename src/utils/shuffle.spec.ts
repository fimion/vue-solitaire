import { describe, expect, it } from "vitest";
import {
  buildShareUrl,
  createPlayingDeck,
  createSeededRandom,
  generateSeed,
  parseSeedFromSearch,
  shuffle,
} from "./shuffle.js";

describe("createSeededRandom (SplitMix64)", () => {
  it("produces the exact same sequence for the same 64-bit seed", () => {
    const rngA = createSeededRandom(18446744073709551615n);
    const rngB = createSeededRandom("18446744073709551615");

    const seqA = Array.from({ length: 20 }, () => rngA());
    const seqB = Array.from({ length: 20 }, () => rngB());

    expect(seqA).toEqual(seqB);
  });

  it("produces different sequences for seeds that differ only in the upper 64-bit range", () => {
    // Both seeds have identical lower 32 bits (1), differing only in bit 60
    const seedLow = 1n;
    const seedHigh = (1n << 60n) | 1n;

    const rngA = createSeededRandom(seedLow);
    const rngB = createSeededRandom(seedHigh);

    const seqA = Array.from({ length: 10 }, () => rngA());
    const seqB = Array.from({ length: 10 }, () => rngB());

    expect(seqA).not.toEqual(seqB);
  });

  it("always returns numbers within [0, 1)", () => {
    const rng = createSeededRandom(42n);
    for (let i = 0; i < 1000; i++) {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("generateSeed", () => {
  it("returns a positive 64-bit bigint", () => {
    const seed = generateSeed();
    expect(typeof seed).toBe("bigint");
    expect(seed).toBeGreaterThan(0n);
    expect(seed).toBeLessThanOrEqual(0xffffffffffffffffn);
  });
});

describe("parseSeedFromSearch", () => {
  it("extracts a valid positive 64-bit integer seed from a query string", () => {
    expect(parseSeedFromSearch("?seed=12345")).toBe(12345n);
    expect(
      parseSeedFromSearch("?foo=bar&seed=18446744073709551615&baz=1"),
    ).toBe(18446744073709551615n);
  });

  it("returns null when seed parameter is missing, invalid, or exceeds 64 bits", () => {
    expect(parseSeedFromSearch("")).toBeNull();
    expect(parseSeedFromSearch("?other=123")).toBeNull();
    expect(parseSeedFromSearch("?seed=")).toBeNull();
    expect(parseSeedFromSearch("?seed=abc")).toBeNull();
    expect(parseSeedFromSearch("?seed=0")).toBeNull();
    expect(parseSeedFromSearch("?seed=-42")).toBeNull();
    // 2^64 (18446744073709551616) exceeds 64-bit unsigned max
    expect(parseSeedFromSearch("?seed=18446744073709551616")).toBeNull();
  });
});

describe("buildShareUrl", () => {
  it("appends or replaces the 64-bit seed query parameter on the URL", () => {
    expect(buildShareUrl("http://localhost:5173/", 424242n)).toBe(
      "http://localhost:5173/?seed=424242",
    );
    expect(
      buildShareUrl("http://localhost:5173/?seed=111", 18446744073709551615n),
    ).toBe("http://localhost:5173/?seed=18446744073709551615");
  });
});

describe("createPlayingDeck", () => {
  it("creates a standard 52-card deck with all unique cards face down", () => {
    const deck = createPlayingDeck();
    expect(deck).toHaveLength(52);

    const cardIds = new Set(deck.map((c) => c.card));
    expect(cardIds.size).toBe(52);
    expect(deck.every((c) => c.faceUp === false)).toBe(true);
  });
});

describe("shuffle", () => {
  it("does not mutate the input array", () => {
    const deck = createPlayingDeck();
    const originalOrder = deck.map((c) => c.card);

    shuffle(deck, 999n);

    expect(deck.map((c) => c.card)).toEqual(originalOrder);
  });

  it("returns the exact same card order when given the same 64-bit seed", () => {
    const seed = 9876543210987654321n;
    const deckA = shuffle(createPlayingDeck(), seed);
    const deckB = shuffle(createPlayingDeck(), seed);

    expect(deckA.map((c) => c.card)).toEqual(deckB.map((c) => c.card));
  });

  it("returns a different card order when given a different seed", () => {
    const deckA = shuffle(createPlayingDeck(), 1001n);
    const deckB = shuffle(createPlayingDeck(), 1002n);

    expect(deckA.map((c) => c.card)).not.toEqual(deckB.map((c) => c.card));
  });

  it("preserves all 52 unique cards after shuffling", () => {
    const original = createPlayingDeck();
    const shuffled = shuffle(original, 777n);

    expect(shuffled).toHaveLength(52);
    expect(shuffled.map((c) => c.card)).not.toEqual(original.map((c) => c.card));
    expect(new Set(shuffled.map((c) => c.card)).size).toBe(52);
  });
});

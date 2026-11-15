import { CARD_RANKS, CARD_SUITS } from "@src/constants.js";
import Card from "@class/Card.js";

/**
 * A seed value accepted by the SplitMix64 PRNG (64-bit bigint, integer number, or decimal string).
 */
export type Seed = bigint | number | string;

/** 64-bit unsigned bitmask (2^64 - 1 = 0xffffffffffffffffn) to wrap BigInt arithmetic to 64 bits. */
const MASK_64 = 0xffffffffffffffffn;

/** Odd 64-bit Weyl sequence increment derived from the golden ratio: floor((sqrt(5) - 1) / 2 * 2^64). */
const GOLDEN_GAMMA = 0x9e3779b97f4a7c15n;

/** First Stafford Variant 13 64-bit mixing multiplier. */
const MIX_MULT_1 = 0xbf58476d1ce4e5b9n;

/** Second Stafford Variant 13 64-bit mixing multiplier. */
const MIX_MULT_2 = 0x94d049bb133111ebn;

/** 2^53 (9007199254740992), matching the exact 53-bit significand precision of an IEEE-754 double. */
const FLOAT_53_DIVISOR = Number(1n << 53n);

/**
 * Coerces a Seed (bigint, number, or numeric string) into an unsigned 64-bit bigint.
 */
export function normalizeSeed(seed: Seed): bigint {
  const big = typeof seed === "bigint" ? seed : BigInt(seed);
  return big & MASK_64;
}

/**
 * Creates a deterministic 64-bit pseudo-random number generator (SplitMix64)
 * seeded with a 64-bit integer. Each call to the returned function advances
 * the internal 64-bit state and returns a uniform 53-bit-precision float in [0, 1).
 *
 * Reference: Steele, Lea, and Flood (2014), "Fast Splittable Pseudorandom Number Generators"
 * and Sebastiano Vigna's reference `splitmix64.c`.
 */
export function createSeededRandom(seed: Seed): () => number {
  // Coerce the initial seed into an unsigned 64-bit BigInt in [0, 2^64 - 1].
  // Because JS BigInts have arbitrary precision, `& MASK_64` truncates to 64 bits.
  let state = normalizeSeed(seed);

  return () => {
    // 1. Advance the 64-bit Weyl sequence state by adding the odd golden-ratio
    //    constant 0x9e3779b97f4a7c15n and masking to 64 bits (`& MASK_64`).
    //    Because the increment is odd (coprime to 2^64), `state` visits all
    //    2^64 (~1.84 * 10^19) states before repeating.
    state = (state + GOLDEN_GAMMA) & MASK_64;

    // 2. First Stafford Variant 13 bit-avalanche mixing step:
    //    - `state >> 30n` shifts the upper 34 bits down to XOR (`^`) with the lower bits.
    //    - Multiply by the odd 64-bit constant `0xbf58476d1ce4e5b9n` and wrap to 64 bits (`& MASK_64`).
    let z = ((state ^ (state >> 30n)) * MIX_MULT_1) & MASK_64;

    // 3. Second Stafford Variant 13 bit-avalanche mixing step:
    //    - `z >> 27n` folds the upper bits into the lower bits again via XOR (`^`).
    //    - Multiply by the second odd 64-bit constant `0x94d049bb133111ebn` and wrap to 64 bits.
    //    - Together, steps 2 and 3 ensure flipping any single input seed bit flips ~50% of output bits.
    z = ((z ^ (z >> 27n)) * MIX_MULT_2) & MASK_64;

    // 4. Final tempering step:
    //    - XOR the upper 33 bits (`z >> 31n`) into the lower bits one last time.
    z = (z ^ (z >> 31n)) & MASK_64;

    // 5. Normalization to a 53-bit-precision IEEE-754 float in [0, 1):
    //    - Standard JS numbers (IEEE-754 double precision) have 53 bits of significand precision.
    //    - `z >> 11n` takes the top 53 bits of the 64-bit mixed output (an integer in [0, 2^53 - 1]).
    //    - Dividing by 2^53 (`FLOAT_53_DIVISOR`) produces a uniform float in [0, 1).
    return Number(z >> 11n) / FLOAT_53_DIVISOR;
  };
}

/**
 * Generates a random positive 64-bit integer seed in [1, 2^64 - 1]
 * using the Web Crypto API.
 */
export function generateSeed(): bigint {
  const array = new BigUint64Array(1);
  globalThis.crypto.getRandomValues(array);
  return array[0] === 0n ? 1n : array[0];
}

/**
 * Parses a positive 64-bit integer `seed` parameter from a URL query string
 * using built-in URLSearchParams. Returns null if absent or outside [1, 2^64 - 1].
 */
export function parseSeedFromSearch(search: string): bigint | null {
  const params = new URLSearchParams(search);
  const raw = params.get("seed");
  if (!raw || !/^\d+$/.test(raw.trim())) {
    return null;
  }
  const parsed = BigInt(raw.trim());
  return parsed > 0n && parsed <= MASK_64 ? parsed : null;
}

/**
 * Builds a shareable URL containing the `seed` query parameter
 * based on the given base URL string.
 */
export function buildShareUrl(
  baseHref: string,
  seed: Seed | null | undefined,
): string {
  const url = new URL(baseHref);
  if (seed !== null && seed !== undefined) {
    url.searchParams.set("seed", String(seed));
  } else {
    url.searchParams.delete("seed");
  }
  return url.toString();
}

/**
 * Returns a new array shuffled deterministically using Fisher-Yates
 * and the 64-bit SplitMix64 PRNG. Does not mutate the input array.
 */
export function shuffle<T>(items: readonly T[], seed: Seed): T[] {
  const result = [...items];
  const random = createSeededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Creates a standard unshuffled 52-card playing deck.
 */
export function createPlayingDeck(): Card[] {
  const deck: Card[] = [];
  CARD_SUITS.forEach((suit) => {
    CARD_RANKS.forEach((rank) => deck.push(new Card(rank, suit)));
  });
  return deck;
}

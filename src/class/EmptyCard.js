/**
 * @module @class/EmptyCard.js
 */
import { READ_ONLY } from "@src/constants.js";

/**
 * @class EmptyCard
 */
class EmptyCard {
  constructor() {
    /**
     * This is always true.
     * @type {boolean}
     */
    this.isEmpty = true;
    Object.defineProperty(this, "isEmpty", READ_ONLY);
  }
}

export default EmptyCard;

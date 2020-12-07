import {computed} from "vue"
import _get from "lodash/get"
/**
 * @callback getObject
 * @return {Array|Object} returns a reference to the object/array we want computed values of.
 */


/**
 * This will take in a function that returns a reactive object and return an
 * object full of computed values for each property on the original reactive object
 *
 * @param {Object|Array} obj
 * @param {string|string[]} findThing
 */
export const toComputed = (obj, findThing) => {
    const myComputedValues = {}
    Object.keys(_get(obj,findThing,{})).forEach((key) => {
      myComputedValues[key] = computed(() => _get(obj,[findThing, key]))
    })
    return myComputedValues
}

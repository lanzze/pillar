/**
 * The all api mappings.
 * Each module's api mapping will merge with this object.
 *
 * @type {{[string]:*}}
 */
const mappings = {};

export function register(target) {
  Object.assign(mappings, target);
}

export default mappings;
/**
 * The all api mappings.
 * Each module's api mapping will merge with this object.
 *
 * @type {{[string]:*}}
 */
const mapping = {};

export function register(target) {
  Object.assign(mapping, target);
}

export default mapping;
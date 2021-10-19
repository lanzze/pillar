/**
 * Get the value from given model by key. If value is null, return default value.
 * @param model {Object|Array} The model.
 * @param key {String} The property key.
 * @param def {*?} The default value.
 * @return {*} The value on key.
 */
export default function get(model, key, def) {
  if (model == null) return def;
  if (key == null) return model;

  let keys  = key.split("."),
      count = keys.length;
  let owner = model;

  if (count > 1) {
    for (let i = 0; i < count - 1; i++) {
      if ((owner = owner[keys[i]]) == null) {
        return def;
      }
    }
  }

  let value = owner[keys[count - 1]];
  return value == null ? def : value;
}
/**
 * Set the state value on store.
 * @param model
 * @param key {String} The store key(field1.field2.field3...).
 * @param value
 */
export default function set(model, key, value) {
  let fields = key.split("."), count = fields.length;
  /**
   * If just have one field, then set value directly.
   */
  if (count === 0) {
    return model[key] = value;
  }
  /**
   * Otherwise, set value to last field, if middle field is null, set to an new object.
   */
  fields.reduce(function (p, v, i) {
    return i === count - 1 ? p[v] = value : p[v] || (p[v] = {});
  }, model);
}
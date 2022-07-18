import {isRef} from "vue";

export const get = (target, data) => {
  if (isRef(data)) data = data.value;
  return target instanceof Function ? target(data) : target
};
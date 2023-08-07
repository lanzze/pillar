import {unref} from "vue";

export const get = (target: any, data: any): any => {
  return target instanceof Function ? target(unref(data)) : target
};
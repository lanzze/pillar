import {isRef} from "vue";

const color_reg = /^(primary|secondary|tertiary|info|success|warning|error|accent)$/;
export const noCssColor = value => color_reg.test(value);

export const get = (target, argument) => {
  if (isRef(argument)) argument = argument.value;
  return target instanceof Function ? target(argument) : target
};
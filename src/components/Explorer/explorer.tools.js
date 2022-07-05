const color_reg = /^(primary|secondary|tertiary|info|success|warning|error|accent)$/;
export const isCssColor = value => !color_reg.test(value);
import options from "./component.options";

const themeColors = options["theme.color.names"].reduce((p, v) => (p[v] = true, p), {});

export const isThemeColor = color => themeColors[color] === true;

import Progresser from "./Modal/Progresser.js";

const options = {
  "framework": "quasar",

  "theme.color.names": ["primary", "secondary", "tertiary", "accent", "info", "positive", "negative", "success", "error", "warning"],

  "loading.text": "加载中...",

  "empty.text": "暂无数据...",

  "modal.maximum.image": "mdi-window-restore",
  "modal.maximum.color": "transparent",
  "modal.minimum.image": "mdi-window-maximize",
  "modal.minimum.color": "transparent",

  "modal.closer.image": "mdi-close",
  "modal.closer.color": "transparent",

  "modal.cancel.image": undefined,
  "modal.cancel.label": "取消",
  "modal.cancel.color": "warning",
  "modal.cancel.native": {},

  "modal.submit.image": undefined,
  "modal.submit.label": "提交",
  "modal.submit.color": "primary",
  "modal.submit.native": {},

  "modal.progress": Progresser,
  "modal.progress.native": {color: "white", size: "23px"},

  "modal.submit.label.loading": "加载中...",
  "modal.submit.image.loading": "hourglass",

  "modal.submit.label.saving": "保存中...",
  "modal.submit.image.saving": "hourglass",

  "modal.submit.label.validating": "验证中...",
  "modal.submit.image.validating": "hourglass",


  "chart.button.normal": "secondary",
  "chart.button.active": "secondary",
  "chart.button.native": {},
  "date.millisecond": () => Date.now(),

  "stateful.error": {tag: "q-icon", label: "暂无数据...", image: "mdi-alert", color: "info"},
  "stateful.empty": {tag: "q-icon", label: "暂无数据...", image: "mdi-information", color: "info"},
  "stateful.loading": {tag: "q-spinner-hourglass", label: "加载中...", color: "info"},

  "renderer.button.color": "primary",
};

export function configure(newOptions) {
  Object.assign(options, newOptions);
}

export default options;
import Progresser from "./Modal/Progresser.js";

const options = {
  "framework": "quasar",
  "modal.maximum.icon": "mdi-window-maximize",
  "modal.minimum.icon": "mdi-minus",
  "modal.closer.icon": "mdi-close-circle",
  "modal.cancel.image": undefined,
  "modal.cancel.label": "取消",
  "modal.cancel.color": "warning",
  "modal.cancel.native": {},

  "modal.submit.image": undefined,
  "modal.submit.label": "提交",
  "modal.submit.color": "primary",
  "modal.submit.native": {},

  // "modal.progress": "q-icon",
  "modal.progress": Progresser,
  "modal.progress.native": {color: "white", size: "23px"},

  "modal.submit.label.loading": "加载中...",
  "modal.submit.image.loading": "hourglass",

  "modal.submit.label.saving": "保存中...",
  "modal.submit.image.saving": "hourglass",

  "modal.submit.label.validating": "验证中...",
  "modal.submit.image.validating": "hourglass"

};

export function configure(newOptions) {
  Object.assign(options, newOptions);
}

export default options;
const options = {
  "framework": "quasar",
  "modal.maximum.icon": "mdi-window-maximize",
  "modal.minimum.icon": "mdi-minus",
  "modal.closer.icon": "mdi-close-circle",
  "modal.cancel.image": null,
  "modal.cancel.label": "white",
  "modal.cancel.color": "white",
  "modal.cancel.native": {},

  "modal.submit.image": "white",
  "modal.submit.label": "white",
  "modal.submit.color": "white",
  "modal.submit.native": {},

  "modal.progress": "q-spinner",
  "modal.progress.native": {},

  "modal.submit.label.loading": "white",
  "modal.submit.image.loading": "white",

  "modal.submit.label.saving": "white",
  "modal.submit.image.saving": "white",

  "modal.submit.label.validating": "white",
  "modal.submit.image.validating": "white"

};

export function configure(newOptions) {
  Object.assign(options, newOptions);
}

export default options;
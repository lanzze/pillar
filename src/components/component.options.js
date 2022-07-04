const options = {
  "framework": "quasar",
  "modal.icon.maximum": "",
  "modal.icon.minimum": "",
  "modal.icon.closer": "white",
  "modal.cancel.image": "white",
  "modal.cancel.label": "white",
  "modal.cancel.color": "white",
  "modal.submit.image": "white",
  "modal.submit.label": "white",
  "modal.submit.label.saving": "white",
  "modal.submit.color": "white",
  "modal.submit.image.validating": "white",
  "modal.submit.image.saving": "white",
};

export function configure(newOptions) {
  Object.assign(options, newOptions);
}

export default options;
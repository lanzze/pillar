const options = {
  "framework": "quasar",
  "modal.icon.maximum": "",
  "modal.icon.minimum": "",
  "modal.icon.closer": "white",
  "modal.cancel.icon": "white",
  "modal.cancel.label": "white",
  "modal.cancel.color": "white",
  "modal.submit.icon": "white",
  "modal.submit.label": "white",
  "modal.submit.color": "white",
  "modal.submit.icon.validating": "white",
  "modal.submit.icon.saving": "white",
};

export function configure(newOptions) {
  Object.assign(options, newOptions);
}

export default options;
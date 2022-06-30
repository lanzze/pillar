const options = {
  "framework": "quasar",
  "modal.icon.maximum": "",
  "modal.icon.minimum": "",
  "modal.icon.closer": "white",
  "modal.icon.cancel": "white",
  "modal.icon.submit": "white",
  "modal.icon.submit.validating": "white",
  "modal.icon.submit.saving": "white",
};

export function configure(newOptions) {
  Object.assign(options, newOptions);
}

export default options;
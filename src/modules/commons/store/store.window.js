export const state = {
  /**
   * The windows state. Do not change the property directly.
   * @see window.open
   * @see window.hide
   */
  windows: {
    items: [],          // All window object(Opened).
    front: null,        // An id point to foremost window.
    layer: 1000000000   // Default css z-index.
  }
}

export const actions = {
  /**
   * Open a window. If window already opened, then show in foremost and update the data.
   * The 'options' passable value is:
   * @typedef {Object} options
   * @property {string} options.id The window id, unique.
   * @property {[]} options.sizes [optional] The window size[width,height].
   * @property {String} options.title [optional] The window title.
   * @property {String} options.icon [optional] The window icon.
   * @property {Object} options.attrs [optional] The attrs value for options.component.
   * @property {Object} options.offset [optional] The window open offset.
   * @property {Object} options.config [optional] the attrs value for {@link Dialog}.
   * @property {function|String} options.content The inner component show on window.
   * @property {[]} options.transition The animate on window open and close.
   * @property {function} options.onSubmit [optional] Call when client click 'Submit' button on window.
   * @property {function} options.onCancel [optional] Call when client click 'Cancel' button on window.
   * @param state {Object} Vuex.Store.state.
   * @param options {options} The window options.
   */
  "window.open": ({state}, options) => {
    let window = state.windows.items.find(e => e.id === options.id);
    if (window != null) {
      state.windows.front = options.id;
      return Object.assign(window, options);
    }
    if (options.content) {
      setTimeout(() => state.windows.items.push(options), 0);
    }
  },

  /**
   * Close the window.
   * The action will remove component from vue component tree, not just set invisible for css attribute.
   * So, all resource of window used will destroy.
   * @param state {Object}
   * @param id {String} The window id.
   */
  "window.hide": ({state}, id) => {
    let index = state.windows.items.findIndex(e => e.id === id);
    if (index >= 0) {
      state.windows.items.splice(index, 1);
    }
  },
  /**
   * Open a window and return a {@link Promise} object, you can use '.then' or '.catch' get window action.
   * If user click the 'SUBMIT' button, then the {@link Promise} will resolve,
   * if user click the 'CANCEL' button, then the {@link Promise} will reject.
   *
   * Usually, when user click 'SUBMIT' or 'CANCEL' or other 'ACTION' event, the window will close,
   * If you want to change that, set 'options.prevent=true'.
   *
   * @param context
   * @param options {Object} like 'window.open'.
   * @returns {Promise<unknown>}
   */
  "window.once": (context, options) => {
    return new Promise(((resolve, reject) => {
      context.dispatch("window.open", {
        id: Math.random().toString(16),
        modally: true,
        prevent: false,
        maximizer: false,
        ...options,
        onSubmit: resolve,
        onCancel: reject
      })
    }));
  },
  /**
   * Close all opened windows.
   * @param state
   */
  "window.clear": ({state}) => {
    state.windows.items.splice(0, state.windows.items.length);
  }
}
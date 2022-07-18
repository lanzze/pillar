import {state as bs, actions as ba} from "./store.board"
import {state as ws, actions as wa} from "./store.window"
import {state as ms, actions as ma} from "./store.mission"

export default {
  state: {
    jobs: null,
    ...bs,
    ...ws,
    ...ms
  },
  mutations: {},
  actions: {
    ...ba,
    ...wa,
    ...ma,
    /**
     * Show a message on screen. The options object passable value is:
     * @typedef {Object} options
     * @property {String} options.title The message title.
     * @property {String} options.content [optional] the message content.
     * @property {String} color [optional] The notify color, support any color(color name or hex).
     * @property {String} type [optional] The message type, support:info|warning|error|.
     *
     * @param context {Object}
     * @param options {options}
     */
    notify(context, options) {
      alert(options.content || options.title);
    }
  }
};
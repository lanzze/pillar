// import schedule from "node-schedule";
import missions from "../config/mission";

export default {
  state: {
    jobs: null,           // All job instance.
    /**
     * The window state. Do not change the property directly.
     * @see window.open
     * @see window.hide
     */
    window: {
      items: [],          // All window object(Opened).
      front: null,        // A id point to foremost window.
      zIndex: 999999999   // Default css z-index.
    }
  },
  mutations: {},
  actions: {
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
    },
    "mission.register"(context, items = missions) {
      if (context.state.jobs) {
        context.state.jobs.forEach(job => job.cancel());
      }

      let config = {silent: true};
      let model = {user: context.rootState.user};

      let executor = (job) => {
        let start = Date.now();

        if (job.source) {
          context.dispatch("request", Object.assign({
            model: model,
            config: config,
            method: "post"
          }, job.source)).then(data => {
            if (job.execute) {
              return job.execute(context, data, start);
            }
            context.commit("SET", {key: job.key, data: data});
          });
        } else if (job.execute) {
          job.execute(context, null, start);
        }
      };

      context.state.jobs = Object.seal(missions.filter(e => e.disabled !== true)
          .map(job => {
            if (job.immediate) executor(job);
            if (job.rule) {
              return schedule.scheduleJob(job.rule, function () {
                return executor(job);
              });
            }
          }).filter(job => !!job)
      );
    },

    /**
     * Open a window. If window already opened, then show in foremost and update the data.
     * The 'options' passable value is:
     * @typedef {Object} options
     * @property {string} options.id The window id, unique.
     * @property {Promise} options.component The inner component show on window.
     * @property {Object} options.attrs [optional] The attrs value for options.component.
     * @property {Object} options.config [optional] the attrs value for window.
     * @property {function} options.onsubmit [optional] Call when client click 'Submit' button on window.
     * @property {function} options.oncancel [optional] Call when client click 'Cancel' button on window.
     * @param state {Object} Vuex.Store.state.
     * @param options {options} The window options.
     */
    "window.open"({state}, options) {
      let window = state.window.items.find(e => e.id === options.id);
      if (window != null) {
        state.window.front = options.id;
        return Object.assign(window, options);
      }
      state.window.items.push(options);
    },

    /**
     * Close the window.
     * The action will remove component from vue component tree, not just set invisible for css attribute.
     * So, all resource of window used will be destroy.
     * @param state {Object}
     * @param id {String} The window id.
     */
    "window.hide"({state}, id) {
      let index = state.window.items.findIndex(e => e.id === id);
      if (index >= 0) {
        state.window.items.splice(index, 1);
      }
    },
  }
};
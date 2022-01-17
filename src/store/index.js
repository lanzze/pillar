import {createStore} from "vuex";
import set           from "../assists/set";
import plugins       from "../plugins/vue/vuex.plugin.index";

export default createStore({
  plugins,
  state: {
    /**
     * The global ajax instance. Set on vuex-plugin, use in store.action.
     * Do not set this value by you little hand directly.
     * @type {Ajax}
     *
     */
    agent: null,
    /**
     * The global user object.
     * If you want modify this object, please copy it then modify.
     * @type {Object}
     */
    user: null,
    /**
     * The current theme of system, Default is 'default'.
     * @type {String}
     */
    theme: "default",
    /**
     * The time diff between client and server.
     * Sometimes, the client date not same with server, so we store the time diff value.
     * This value will update by heartbeat mission, but first update by client connect server at first time.
     * @type Number
     */
    timediff: 0
  },
  mutations: {
    /**
     * Set the state value on store.
     * @param state
     * @param key {String} The store key(moduleName.fieldName1.fieldName2...).
     * @param data {*}
     */
    SET(state, {key, value}) {
      set(state, key, value);
    }
  },
  actions: {}
});
import Lookup from "../../core/Lookup";

/**
 * The request agent of ajax.
 * Before use, you must set the mappings.
 *
 * @author    Aslan
 * @version   1.0
 */
class RequestAgent {
  /**
   * The constructor.
   * @param mappings {Object} The url mappings.
   */
  constructor(mappings) {
    this.mappings = mappings;
  }

  /**
   * Any request to server. Provide a request key, data and config for it.
   *
   * The request url, method, config object will get from mappings by key.
   * If you want to cancel request, please set 'config.cancel=true',
   * the inner code will set 'config.cancel' to cancel function, you can call it to cancel request();
   *
   * Know that, the response data from server is pure data, no code or message in it.
   * If you want get that information, please set 'config.original=true'.
   *
   * And, if have any error, the inner code will handle it. If you want to no notice show on screen when error happened,
   * set 'config.silent=true'. Also you can use '.catch(reject=>{})' to catch the error.
   * The 'reject' object have two field, witch is 'code'(the response code as integer) and 'error'(the Error object instance).
   *
   * If use get request, the data will inject as 'params' field, otherwise inject as 'data' field.
   *
   * @param key {String} Request key string, must mapping in mapping-file.
   * @param data {*?} The data will send to server.
   * @param config {Object?} The request config object.
   * @returns {Promise<*>} The promise with server response data.
   */
  fetch(key, data, config = {}) {
    let options = this.mappings[key];
    if (options == null) {
      return Promise.reject({code: -1, error: new Error("No mapping found for key: " + key)});
    }
    /**
     * If options was a string, that means options just a url and use post.
     * And no config use in request.
     */
    if (typeof options === "string" || options instanceof String) {
      return Lookup.ajax.post(options, data);
    }
    /**
     * Otherwise, options was an object. The options will merge with parameter 'config'.
     * @type {{data: (*|undefined), params: (*|undefined)}}
     */
    let inject = {[options.field || (options.method === 'get' ? 'params' : 'data')]: data};
    return Lookup.ajax.request(Object.assign(config, options, inject));
  }
}

/**
 * Install $agent for Vue.prototype and store.state(in root).
 * @param app {Object} The vue app instance.
 * @param options {Object} The url mappings.
 */
export default function install(app, options) {
  app.config.globalProperties.$store.state.agent = app.config.globalProperties.$agent = Object.freeze(new RequestAgent(options));
}
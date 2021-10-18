import axios from "axios"
import jsonp from "jsonp";
import Ajax  from "./Ajax"

/**
 * The ajax request class use axios framework.
 *
 * @author    Aslan
 * @version   1.0
 */
export default class AxiosAjax extends Ajax {

  /**
   * The constructor.
   * @param defaults {Object?} The axios default options, will marge with axios default.
   * @param request {function?} The request interceptor for axios.
   * @param response {function?} The response interceptor for axios.
   */
  constructor(defaults, request, response) {
    super();
    Object.assign(axios.defaults, defaults);
    if(request != null){
      if(!(request instanceof Function)){
        throw new Error("Request interceptor must a function.")
      }
      axios.interceptors.request.use(request);
    }
    if(request != null){
      if(!(request instanceof Function)){
        throw new Error("Request interceptor must a function.")
      }
      axios.interceptors.response.use(response);
    }
  }

  request(config) {
    return new Promise((resolve, reject) => {
      /**
       * If 'config.cancel=true', that means this request can be cancel.
       * An cancel function will override to 'config.cancel'.
       * So, you can call 'config.cancel()' to cancel the request.
       */
      if (config.cancel === true) {
        new axios.CancelToken(cancel => {
          config.cancel = cancel;     // Set cancel function to 'config.cancel'.
        });
      }
      axios(config).then(resolve).catch(reject);
    });
  }

  /**
   * This method will call {@link request}.
   * @inheritDoc
   */
  post(url, data, config) {
    return this.request(Object.assign(config || {}, {url, data, config, method: "post"}));
  }

  /**
   * This function will call {@link request}.
   * @inheritDoc
   */
  get(url, config) {
    return this.post(Object.assign(config || {}, {url, config, method: "get"}));
  }

  jsonp(url, config) {
    return new Promise((resolve, reject) => {
      try {
        if (config && config.cancel === true) {
          config.cancel = jsonp(url, config, (error, data) => error ? reject(error) : resolve(data))
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  all(requests) {
    return new Promise((resolve, reject) => {
      axios.all(requests.map(req => axios(req)))
          .then(axios.spread((...args) => resolve(args)))
          .catch(reject);
    });
  }

  meeting(url, data, config) {
    return axios.post(url, data, config);
  }
}

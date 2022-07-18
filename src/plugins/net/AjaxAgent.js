import moment    from "moment";
import AxiosAjax from "./AxiosAjax";
import Ajax      from "./Ajax";

/**
 * An ajax request agent.
 *
 * For process error and unpack data.
 *
 * @author      Aslan
 * @version     1.0
 */
export default class AjaxAgent extends Ajax {

  /**
   * The constructor.
   * @param options {Object} The options for get info from response data;
   * @param handler {function(code:Number,error:Error)} The function for handle error.
   * @param ajax {Ajax?} The ajax instance.
   */
  constructor(options, handler, ajax) {
    super();
    this.success = options.success || 0;
    this.error = options.error || -1;
    this.field = options.field;
    this.handler = handler;
    this.ajax = ajax || new AxiosAjax();
  }

  meeting(url, data, config) {
    return this.request(Object.assign(config || {}, {url, data, method: "post"}));
  }

  request(config) {
    return this.ajax.request(config).then(res => {
      if (process.env.NODE_ENV === "development") {
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"), "".concat(config.method, ":").concat(config.url), res);
      }
      if (config.original === true) {
        return Promise.resolve(res);
      }
      let data = res.data,
          code = data != null ? data.code : undefined;
      if (code === undefined || code === this.success) {
        return Promise.resolve(code === this.success ? data.data : data);
      }
      return Promise.reject(res.data);
    }).catch(exc => {
      console.error(exc);
      const [code, error] = toError(exc, this.error);
      if (config.silent !== true) {
        this.handler(code, error);
      }
      return Promise.reject({code, error});
    });
  }

  post(url, data, config) {
    return this.request(Object.assign(config || {}, {url, data}));
  }

  get(url, config) {
    return this.request(Object.assign(config || {}, {url}));
  }

  jsonp(url, config) {
    return this.ajax.jsonp(url, config).then(res => {
      if (process.env.NODE_ENV === "development") {
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"), "jsonp:".concat(url), res);
      }
      if (config && config.original === true) {
        return Promise.resolve(res);
      }
      return Promise.resolve((res && res.data) || res);
    }).catch(exc => {
      console.error(exc);
      const [code, error] = toError(exc, this.error);
      if (!config || config.silent !== true) {
        this.handler(code, error);
      }
      return Promise.reject({code, error});
    });
  }

  all(requests) {
    return this.ajax.all(requests).then(list => {
      if (process.env.NODE_ENV === "development") {
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"), "batch:", list);
      }
      return list.map(res => {
        if (res.config.original === true) {
          return res.data;
        }
        if (res.data.code !== this.success) {
          return null;
        }
        return res.data ? res.data.data : res.data;
      });
    });
  }
}

function toError(exc, code) {
  if (exc instanceof Error) {
    return [code, exc];
  }
  if (typeof exc === "string") {
    return [code, new Error(exc)];
  }
  if (typeof exc === "object") {
    const message = this.field instanceof Function ? this.field(exc) : exc[this.field];
    return [exc.code == null ? code : exc.code, new Error(message)];
  }
  return [code, new Error("Unknown error")];
}
import {handler}  from "../assists/assists.ajax";
import {response} from "../assists/assists.ajax";
import {request}  from "../assists/assists.ajax";
import defaults   from "../config/axios.defaults";
import website    from "../config/website";
import AjaxAgent  from "../plugins/net/AjaxAgent";
import AxiosAjax  from "../plugins/net/AxiosAjax";
import store      from "../store";

/**
 * Global ajax instance. Readonly!
 * @type {Readonly<AjaxAgent>}
 */
const ajax = Object.freeze(new AjaxAgent(
    {
      success: website.SUCCESS_CODE,
      error: website.LOCAL_ERROR_CODE,
      field: e => e.message || e.msg || e.info
    },
    handler,
    new AxiosAjax(defaults, request, response)));

/**
 * Global
 */
export default class Lookup {

  /**
   * Global ajax instance. You can access in anywhere.
   * @type {Readonly<AjaxAgent>}
   */
  static get ajax() {
    return ajax;
  }

  /**
   * Get the server time in ms.
   * @returns {number}
   */
  static get servertime() {
    return Date.now() + store.state.timediff;
  }
}
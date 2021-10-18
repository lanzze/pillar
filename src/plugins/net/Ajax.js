/**
 * The interface of ajax net communication.
 * @author      Aslan
 * @version     1.2
 * @interface
 */
export default class Ajax {

  /**
   * A complete net request. provide a request config, contains url/method/data.
   *
   * @param config {Object} The request config, like {@link axios} config.
   * @see {@link axios}
   */
  request(config) {}

  /**
   * A post request.
   * @param url {String} The request url.
   * @param data {Object?} The request parameter.
   * @param config {Object?} Request config.
   */
  post(url, data, config) {}

  /**
   * A get request.
   * @param url {String} The request url.
   * @param config {Object?} Request config.
   */
  get(url, config) {}

  /**
   * The jsonp request.
   * @param url {String} The request url.
   * @param config {Object?} Request config.
   */
  jsonp(url, config) {}

  /**
   * For a request list.
   * @param requests {[]} The request configs.
   */
  all(requests) {}

  /**
   * Meeting with server. This function may call first when system open.
   * @param url {String} The server url.
   * @param data {Object?} Any data.
   * @param config {Object?} The config data.
   * @return {Promise} The server response data, may get the config data (include the server time).
   */
  meeting(url, data, config) {}
}
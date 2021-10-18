/**
 * Global application config. Readonly!
 * Any updatable config must put in Vuex.store.
 * @type {Readonly<Object>}
 */
export default Object.freeze({
  SUCCESS_CODE: 200,                // The success code from server.
  SYSTEM_TITLE: "前端框架"           // The system title show on browser or some place.
});
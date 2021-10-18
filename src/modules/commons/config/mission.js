/**
 * The global missions, do not put any module mission in the list,
 * use down function 'register' to register the mission.
 */
const missions = [{
  id: "The mission id",
  disabled: true,                 // [Optional] Disable the job.
  key: "module.state.field",      // [Optional] The key for set data in vue store.state
  immediate: false,               // [Optional] Immediate execute job.
  /**
   * [Optional]
   * The source for fetch data from server.
   * An user object will inject to 'model' object.
   */
  source: {
    url: "/api/xxx",              // URL
    data: null                    // [Optional] The data for send to server. Use first.
  },

  trigger: {
    cron: "* * * * * *",
    start: "2020-01-01 00:00:00",
    stops: "2020-01-02 00:00:00"
  },

  /**
   * [Optional]
   * A function call when fetch data complete, or call immediate (When source is null).
   * If exists, you must update data by you self. So 'key' don't need exists.
   * @param context Vuex.Store
   * @param data {*} The data from server.
   * @param start {Number} The start time in ms(Job call time).
   */
  execute(context, data, start) {
    // do any thing
  }
}, {
  // The heartbeat mission, beat in every 30 minutes by default.
  id: "heartbeat",
  immediate: true,
  trigger: {cron: "0 */30 * * * ?",},
  source: {url: "/api/system/heartbeat", config: {silent: true}},
  execute(context, data, start) {
    const difference = data + Math.round((Date.now() - start) / 2) - Date.now();
    context.commit("set", {key: "difference", data: difference});
  }
}];


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// I AM SEPARATE LINE.
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Static register the mission.This register will happen on system startup.
 * Each mission has field like up.
 * @param items {*[]} The missions. Must be an array.
 */
export function register(items) {
  missions.push(...items);
}

export default missions;
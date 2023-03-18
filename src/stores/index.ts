import {defineStore} from "pinia";

export default defineStore("store", {
  state: () => ({
    /**
     * 登录用户的用户信息对象。
     *
     * 如果需要修改此对象，修改之前，请将此对象复制一份，待修改完成后再写回去。
     * @type {Object}
     */
    user: null,

    /**
     * 系统当前的主题名称。
     * @type {String}
     */
    theme: "default",

    /**
     * 本地时间与系统时间的毫秒差，此时间差由心跳检测任务自动更新。
     * 使用时，可以调用下方actions里面的{@link servertime}获取服务器时间。
     */
    timediff: 0,

    /**
     * 全局的Ajax请求进度条对象。
     */
    ajaxbar: null,

    /**
     * 全局API访问token，不可直接修改此数据，请调用下方actions里面的{@link setAccessToken}进行更新。
     */
    token: null,
  }),
  actions: {
    /**
     * 获取服务器时间（毫秒）
     * @return 服务器时间（毫秒）
     */
    get servertime(): number {
      return Date.now() + this.timediff;
    },
    /**
     * 保持用户的token到store，并且保持至本地store中。
     * @param token
     */
    setAccessToken(token: string) {
    },
    /**
     * 保持登录用户的用户信息到store。
     * @param userinfo 用户信息对象
     */
    setUserinfo(userinfo) {
      this.user = userinfo;
    },
  },
});
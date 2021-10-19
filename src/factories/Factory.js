import QuasarFactory from "./quasar/QuasarFactory";

const factories = {
  "quasar": QuasarFactory,
};
export default class Factory {

  /**
   * Create a framework factory instance.
   *
   * @param framework {String} The framework name.
   * @param options {Object?} The framework options.
   * @returns {FrameworkFactory}
   */
  static newFactory(framework, options) {
    if (factories[framework] == null) {
      throw new Error("Unsupported framework: " + framework + ". Only support: " + Object.keys(factories));
    }
    return new factories[factories](options);
  }
}
import mapping from "../../config/mapping";
import agent   from "./vue.plugin.agent";

export default function install(app, options) {
  app.use(agent, mapping);
}
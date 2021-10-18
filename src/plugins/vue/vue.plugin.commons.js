import mappings from "../../config/mapping";
import agent    from "./vue.plugin.agent";

export default function install(app, options) {
  app.use(agent, mappings);
}
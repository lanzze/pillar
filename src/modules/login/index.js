import {register as mappingRegister} from "../../config/mapping"
import {register as missionRegister} from "../../config/mission"

import mappings from "./config/login.mappings";
import missions from "./config/login.missions";

import "./styles/login.scss";

+function setup() {
  mappingRegister(mappings);
  missionRegister(missions);
}()
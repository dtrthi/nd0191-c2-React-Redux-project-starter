import { legacy_createStore } from "redux";
import middlewares from "./middlewares";
import reducers from "./reducers";

export default legacy_createStore(reducers, middlewares);

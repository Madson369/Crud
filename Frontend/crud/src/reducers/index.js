import { combineReducers } from "redux";
import getDataReducer from "./GetData";
import getErrorReducer from "./GetError";
import getLoginReducer from "./GetLogin";
import resultUserReducer from "./ResultUser";

const allReducers = combineReducers({
  data: getDataReducer,
  result: resultUserReducer,
  geterror: getErrorReducer,
  login: getLoginReducer,
});

export default allReducers;

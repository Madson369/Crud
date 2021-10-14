import { combineReducers } from "redux";
import getDataReducer from "./GetData";
import deletedUserReducer from "./DeletedUser";

const allReducers = combineReducers({
  data: getDataReducer,
  deleted: deletedUserReducer
});

export default allReducers;

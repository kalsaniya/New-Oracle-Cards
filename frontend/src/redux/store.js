import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { LoginReducer } from "./authReducer/reducer";
import oneCardReducer from "./oneCardReducer/reducer";

const rootReducer = combineReducers({
  authReducer: LoginReducer,
  oneCardReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export default store;

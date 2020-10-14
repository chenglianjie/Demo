// 项目总得store管理
import { combineReducers } from "redux";
import * as encryptIos from "./sonStore/encrypt_ios";
import * as encryptAndriod from "../modules/encrypt_andriod/store"
const Reducer = Object.assign({},
  { encryptIos: encryptIos.default },
  { encryptAndriod: encryptAndriod.default } 
);
const reducer = combineReducers({...Reducer})
export default reducer;

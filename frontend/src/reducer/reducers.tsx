import { combineReducers } from "redux";
import ischeck from "./ischeck.tsx";
import propsData from "./propsData.tsx";



export default combineReducers({
    ischeck,
    propsData,
});

export const rootReducer = combineReducers({
    ischeck: ischeck,
    propsData:propsData,
  });
  
export type RootState = ReturnType<typeof rootReducer>
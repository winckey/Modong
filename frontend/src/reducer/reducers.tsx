import { combineReducers } from "redux";
import ischeck from "./ischeck.tsx";
import propsData from "./propsData.tsx";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from "redux"; 


const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  // blacklist -> 그것만 제외합니다
  // whitelist:["ischeck"]
};

export const rootReducer = combineReducers({
    ischeck: ischeck,
    propsData:propsData,
  });
  
export type RootState = ReturnType<typeof rootReducer>

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const store = createStore(enhancedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
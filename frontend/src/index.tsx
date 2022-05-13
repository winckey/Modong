import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/_index.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore  from "./reducer/reducers.tsx";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from "redux";

import axios from 'axios';

const {store, persistor} = configureStore();

axios.defaults.withCredentials = false;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";


const rootNode = document.getElementById('root')
ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

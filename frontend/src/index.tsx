import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/_index.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore  from "./reducer/reducers.tsx";

import { PersistGate } from "redux-persist/integration/react";

import axios from 'axios';

import { initializeApp } from "firebase/app";

const {store, persistor} = configureStore();

axios.defaults.withCredentials = false;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const config = {
  apiKey: "AIzaSyBbWoqgMFm_g2anVBCpF34nvPeJCFeQyio",
  authDomain: "titanium-scope-324708.firebaseapp.com",
  projectId: "titanium-scope-324708",
  storageBucket: "titanium-scope-324708.appspot.com",
  messagingSenderId: "756560195251",
  appId: "1:756560195251:web:028459f1a747a7f839cac6"
};
initializeApp(config);

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

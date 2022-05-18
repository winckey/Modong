import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { useDispatch } from "react-redux";
import actionCreators from "./actions/actionCreators.tsx"

import Account from './components/Account.tsx'
import Nav from './components/Nav.tsx'

import RootState from "../reducer/reducers.tsx"
import { useSelector } from "react-redux";

import {getFcmToken} from "./common/FcmToken.tsx"

function App() {
  const dispatch = useDispatch();

  const { isLogin } = useSelector((state:RootState) => ({
    isLogin : state.accounts.data.token
  }))

  useEffect(()=> {
    getFcmToken()
    .then((token:string)=>{
      dispatch(actionCreators.setFcmToken(token));
    })
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        {isLogin !== null
          ? <Nav/>
          : <Account/>}
      </div>
    </BrowserRouter>
  );
}

export default App;

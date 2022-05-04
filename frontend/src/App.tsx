import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Account from './components/Account.tsx'
import Nav from './components/Nav.tsx'

import RootState from "../reducer/reducers.tsx"
import { useSelector } from "react-redux";


function App() {

  const { isLogin } = useSelector((state:RootState) => ({
    isLogin : state.accounts.data.token
  }))


  useEffect(()=> {

  }, [isLogin]);


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

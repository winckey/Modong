import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Account from './components/Account'
import Nav from './components/Nav'
import { useSelector } from "react-redux";


function App() {

  const { isLogin } = useSelector(state => ({
    isLogin : state.ischeck.data.isLogin
  }))
  return (
    <BrowserRouter>
      <div className="App">
        {isLogin 
          ? <Nav/>
          : <Account/>}
      </div>
    </BrowserRouter>
  );
}

export default App;

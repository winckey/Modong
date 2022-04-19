import React from 'react';
import logo from './logo.svg';
import './App.css';

import Test1 from './componets/Test1';
import Test2 from './componets/Test2';

import { useSelector, useDispatch } from "react-redux";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Test1/>
        <Test2/>
      </header>
    </div>
  );
}

export default App;

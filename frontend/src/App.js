import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Account from './components/Account'
import Nav from './components/Nav'

// import Test1 from './componets/Test1';
// import Test2 from './componets/Test2';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const setIsLoginchange = () =>{
    setIsLogin(!isLogin);
  }
  return (
    <BrowserRouter>
      <div className="App">
        {isLogin 
          ? <Account setIsLogin={setIsLoginchange}/>
          : <Nav/>}
      </div>
    </BrowserRouter>
  );
}

export default App;

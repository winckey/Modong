import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

function Account(props) {
  const setIsLoginchange = () => {
    props.setIsLogin();
  }
  return (
    <div>
        Account
        <Routes>
          <Route path="/login" element={<Login setIsLogin={setIsLoginchange}/>}/>
          <Route path="/signup" element={<Signup/>}/> 
        </Routes>
        <Link to='/login'>login</Link>
        <Link to='/signup'>signup</Link>
    </div>
  );
}

export default Account;
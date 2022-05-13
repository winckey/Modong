import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Login from './Login.tsx';
import Signup from './Signup.tsx';

function Account() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/> 
        </Routes>
    </div>
  );
}

export default Account;
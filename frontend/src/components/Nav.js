import React from 'react';

import Community from './Community';
import Chat from './Chat';
import Mypage from './Mypage';
import Home from './Home';
import { BrowserRouter, Routes, Route , Link } from 'react-router-dom';

function Nav() {
    
  return (
    <div>
        <p>네브</p>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/mypage" element={<Mypage/>}/>
        </Routes>
        <footer>
          <Link to="/">Home</Link> / 
          <Link to="/community">Community</Link> / 
          <Link to="/chat">Chat</Link> / 
          <Link to="/mypage">Mypage</Link>
        </footer>
    </div>
  );
}

export default Nav;
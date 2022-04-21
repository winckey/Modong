import React from 'react';

import Community from './Community';
import Chat from './Chat';
import Mypage from './Mypage';
import Home from './Home';
import Write from './Write';
import MyCommunityRecord from './mypage/MyCommunityRecord';
import ChatDetail from './chat/ChatDetail';
import Profile from './mypage/Profile';
import MyApplication from './mypage/MyApplication';
import CommunityDetail from './community/CommunityDetail';
import { Routes, Route , Link } from 'react-router-dom';

function Nav() {
    
  return (
    <div>
        <p>네브</p>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/write" element={<Write/>}/>
            <Route path="/mycommunityrecord" element={<MyCommunityRecord/>}/>
            <Route path="/chatdetail" element={<ChatDetail/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/myapplication" element={<MyApplication/>}/>
            <Route path="/communitydetail" element={<CommunityDetail/>}/>
        </Routes>
        
        <Link to="/write">Write</Link><br/>
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
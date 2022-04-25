import React, { useState } from 'react';

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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faList, faComment, faUser } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [dongName, setDongName] = useState('구서동');
  const changeDong = (name) => {
    setDongName(name);
  }  
  return (
    <div>
        <div style={{ display: 'flex' }}>
          <p>{dongName}</p>
          <div>
            <FontAwesomeIcon icon={faBell} className="search" />
            <img src={ require('../assets/favicon.png') } alt="사진"/>
          </div>
        </div>
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
          <Link to="/" style={{ textDecoration: 'none' }} ><FontAwesomeIcon icon={faHouse} className="icon" />Home</Link> / 
          <Link to="/community" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faList} className="icon" />Community</Link> / 
          <Link to="/chat" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faComment} className="icon" />Chat</Link> / 
          <Link to="/mypage" style={{ textDecoration: 'none' }}><FontAwesomeIcon icon={faUser} className="icon" />Mypage</Link>
        </footer>
    </div>
  );
}

export default Nav;
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

import '../style/_nav.scss'

import { useSelector , useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faList, faComment, faUser } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const dispatch = useDispatch();
  const [dongName, setDongName] = useState('구서동');
  const handleDongname = (name) => {
    setDongName(name);
  }
  const { footerSelected } = useSelector(state => ({
    footerSelected : state.ischeck.data.footerSelected
  }))
  const setFooterSelected = (num) => {
    dispatch(actionCreators.setFooterSelected(num));
  }
  return (
    <div>
        <header>
          <p>{dongName}</p>
          <div>
            <FontAwesomeIcon icon={faBell}/>
            <div>
              <img src={ require('../assets/dd.png') } alt="사진"/>
            </div>
          </div>
        </header>
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
        <footer>
          <Link to="/" className={(footerSelected === 1 ? "footeractive":"nostyle")} onClick={()=>{setFooterSelected(1)}} ><FontAwesomeIcon icon={faHouse} className="icon" /><div>홈</div></Link>
          <Link to="/community" className={(footerSelected === 2 ? "footeractive":"nostyle")} onClick={()=>{setFooterSelected(2)}}><FontAwesomeIcon icon={faList} className="icon" /><div>게시판</div></Link>
          <Link to="/chat" className={(footerSelected === 3 ? "footeractive":"nostyle")} onClick={()=>{setFooterSelected(3)}}><FontAwesomeIcon icon={faComment} className="icon" /><div>채팅</div></Link>
          <Link to="/mypage" className={(footerSelected === 4 ? "footeractive":"nostyle")} onClick={()=>{setFooterSelected(4)}}><FontAwesomeIcon icon={faUser} className="icon" /><div>내정보</div></Link>
        </footer>
    </div>
  );
}

export default Nav;
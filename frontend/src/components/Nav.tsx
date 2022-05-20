import React, { useState } from 'react';

import Community from './Community.tsx';
import Chat from './Chat.tsx';
import Mypage from './Mypage.tsx';
import Home from './Home.tsx';
import Write from './Write.tsx';
import MyCommunityRecord from './mypage/MyCommunityRecord.tsx';
import ChatDetail from './chat/ChatDetail.tsx';
import Profile from './mypage/Profile.tsx';
import MyApplication from './mypage/MyApplication.tsx';
import CommunityDetail from './community/CommunityDetail.tsx';
import { Routes, Route , Link } from 'react-router-dom';

import '../style/_nav.scss'

import Alarm from "./Alarm.tsx"

import RootState from "../reducer/reducers.tsx"

import { useSelector , useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHouse, faList, faComment, faUser } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const dispatch = useDispatch();
  const [alarmOpen, setAlarmOpen] = useState<boolean>(false);
  const userData = useSelector((state:RootState) => {
    return state.accounts.data.user
  })

  const footerSelected = useSelector((state:RootState) => {
    return state.ischeck.data.footerSelected
  })

  const handlesetFooterSelected = (num:number) => {
    dispatch(actionCreators.setFooterSelected(num));
  }

  const handlealarmOpen = () => {
    setAlarmOpen(!alarmOpen);
  }
  
  return (
    <div>
        <header>
          <p>{userData.dongDto.dong}</p>
          <div>
            <FontAwesomeIcon onClick={()=>{handlealarmOpen()}} icon={faBell}/>
            {alarmOpen && <Alarm closealarm={handlealarmOpen}/>}
            <div style={{cursor: "pointer"}}>
              <Link to="/profile"><div className='imgdiv'><img src={ userData.image ||require('../assets/pingu.png') } alt="사진"/></div></Link>
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
          <Link to="/" className={(footerSelected === 1 ? "footeractive":"nostyle")} onClick={()=>{handlesetFooterSelected(1)}} ><FontAwesomeIcon icon={faHouse} className="icon" /><div>홈</div></Link>
          <Link to="/community" className={(footerSelected === 2 ? "footeractive":"nostyle")} onClick={()=>{handlesetFooterSelected(2)}}><FontAwesomeIcon icon={faList} className="icon" /><div>게시판</div></Link>
          <Link to="/chat" className={(footerSelected === 3 ? "footeractive":"nostyle")} onClick={()=>{handlesetFooterSelected(3)}}><FontAwesomeIcon icon={faComment} className="icon" /><div>채팅</div></Link>
          <Link to="/mypage" className={(footerSelected === 4 ? "footeractive":"nostyle")} onClick={()=>{handlesetFooterSelected(4)}}><FontAwesomeIcon icon={faUser} className="icon" /><div>내정보</div></Link>
        </footer>
    </div>
  );
}

export default Nav;
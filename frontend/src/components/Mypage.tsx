import React from 'react';
import { Link } from 'react-router-dom';

import "../style/_mypage.scss"
function Mypage() {
   
  return (
    <div className='mypageOutLine'>
        <Link to='/profile'>나의 프로필</Link>
        <Link to='/myapplication'>나의 신청</Link>
        <Link to='/mycommunityrecord'>나의 게시물</Link>
    </div>
  );
}

export default Mypage;
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import "../style/_mypage.scss"

function Mypage() {

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(actionCreators.setUser({}));
    dispatch(actionCreators.setToken(null));
    dispatch(actionCreators.setRefreshToken(null));
    dispatch(actionCreators.setIsLogin(false));
  };

  return (
    <div className='mypageOutLine'>
        <Link to='/profile'>나의 프로필</Link>
        <Link to='/myapplication'>나의 신청</Link>
        <Link to='/mycommunityrecord'>나의 게시물</Link>
        <Link to='/' onClick={logout}>로그아웃</Link>
    </div>
  );
}

export default Mypage;
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';


import "../style/_mypage.scss"
import axios from 'axios';
import { useSelector } from 'react-redux';

import Rootstate from '../reducer/reducers.tsx'

function Mypage() {

  const user = useSelector((state:Rootstate)=> {
    return state.accounts.data
  });

  const dispatch = useDispatch();
  const logout = () => {
    // axios.post("/user-service/logout"

    // ).then((res) => {
    //   console.log(res)
    //   dispatch(actionCreators.setUser({}));
    //   dispatch(actionCreators.setToken(""));
    //   dispatch(actionCreators.setRefreshToken(""));
    // dispatch(actionCreators.setIsLogin(false));
    // })

    console.log('logout')
    console.log("로그아웃 전이얌", user);
    dispatch(actionCreators.setUser({}));
    dispatch(actionCreators.setToken(null));
    dispatch(actionCreators.setRefreshToken(null));
    dispatch(actionCreators.setIsLogin(false));
    
    // localStorage.removeItem('image');
    console.log("로그아웃 후", user);

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
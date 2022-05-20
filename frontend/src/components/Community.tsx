import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/_community.scss"

import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import { useSelector } from 'react-redux';
import RootState from "../reducer/reducers.tsx"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faComments } from "@fortawesome/free-solid-svg-icons";


import {datetrans} from '../actions/_TimeLapse.tsx'

import axios, {AxiosResponse} from "axios";

import { communitytype } from "../actions/_interfaces.tsx"

function Community() {
  const dispatch = useDispatch();
  const handleCommunityPropsData=(d:communitytype)=>{
    dispatch(actionCreators.setCommunityPropsData(d));
  }
  const [boardData, setBoardData]=useState<communitytype[]>([]);
  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.id
})
  const handlegetList = (pageNum:number) => {
    axios.get(`/board-service/list/${userId}?pageNumber=${pageNum}&size=10`)
      .then((response:AxiosResponse) => {
        setBoardData(response.data.content)
      })
  };
  
  useEffect(()=>{
    handlegetList(1)
  },[]);

  return (
    <div className='communityOutLine'>
      {boardData.map((d:communitytype)=>(
        <Link to='/communitydetail' onClick={()=>{handleCommunityPropsData(d)}} 
        key={d.id} className='communityCard'>
          <div>
            <div>{d.description.substr(0,10)}</div>
            <div>{datetrans(d.createdDate.toString())}</div>
            <div></div>
            <div><FontAwesomeIcon icon={faComments}/>댓글 {d.commentNumber}</div>
          </div>
        </Link>
      ))}
        <Link to="/write" className="writemark"><FontAwesomeIcon icon={faPen}/></Link>
    </div>
  );
}

export default Community;
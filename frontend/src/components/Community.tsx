import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/_community.scss"

import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';
import useTimeLapse from '../actions/useTimeLapse';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faComments } from "@fortawesome/free-solid-svg-icons";


import {datetrans} from '../actions/TimeLapse.tsx'

import axios, {AxiosResponse, AxiosError} from "axios";

import { communitytype } from "../actions/_interfaces.tsx"

function Community() {
  const dispatch = useDispatch();
  const handleCommunityPropsData=(d:communitytype)=>{
    dispatch(actionCreators.setCommunityPropsData(d));
  }
  const [boardData, setBoardData]=useState<communitytype[]>([]);

  const handlegetList = (pageNum:number) => {
    axios.get(`/board-service?pageNumber=${pageNum}&pageSize=10`)
      .then((response:AxiosResponse) => {
        console.log(response.data, "from login");
        setBoardData(response.data.content)
      })
      .catch((error:AxiosError) => {
        console.log(error, "에러");
      })
  };
  useEffect(()=>{
    handlegetList(1)
  },[]);
  return (
    <div className='communityOutLine'>
      {boardData.map((d:communitytype, index:number)=>(
        <Link to='/communitydetail' onClick={()=>{handleCommunityPropsData(d)}} key={index} className='communityCard'>
          <div>
            <div>{d.description}</div>
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
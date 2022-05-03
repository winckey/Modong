import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/_community.scss"

import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faComments } from "@fortawesome/free-solid-svg-icons";

import axios, {AxiosResponse, AxiosError} from "axios";

export interface datatype  {
  id: number,
  description: string,
  userId: number,
  createdDate: Date,
  modifiedDate: Date
}

function Community() {
  const dispatch = useDispatch();
  const handleCommunityPropsData=(d:datatype)=>{
    dispatch(actionCreators.setCommunityPropsData(d));
  }
  const [boardData, setBoardData]=useState<datatype[]>([]);

  const handlegetList = (pageNum:number) => {
    axios.get(`/board-service?pageNumber=${pageNum}&pageSize=10`)
      .then((response:AxiosResponse) => {
        console.log(response.data, "from login");
        setBoardData(response.data)
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
      {boardData.map((d:datatype, index:number)=>(
        <Link to='/communitydetail' onClick={()=>{handleCommunityPropsData(d)}} key={index} className='communityCard'>
          <div>{d.description}</div>
          <div>{d.createdDate.toString()}</div>
          {/* <div></div>
          <div><FontAwesomeIcon icon={faComments}/>댓글 {d.}</div> */}
        </Link>
      ))}
        <Link to="/write" className="writemark"><FontAwesomeIcon icon={faPen}/></Link>
    </div>
  );
}

export default Community;
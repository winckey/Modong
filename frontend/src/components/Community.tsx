import React from 'react';
import { Link } from 'react-router-dom';
import "../style/_community.scss"

import { useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faComments } from "@fortawesome/free-solid-svg-icons";

 export interface datatype  {
  commucontents:string;
  commutiem:number;
  commutag:string[];
  repnum:number
}


const data =[{ commucontents:"제목1", commutiem:10, commutag:["강남구", "고기"], repnum:8}, { commucontents:"제목2", commutiem:20, commutag:["강북구", "수시"], repnum:5}]
function Community() {
  const dispatch = useDispatch();
  const handleCommunityPropsData=(d:datatype)=>{
    dispatch(actionCreators.setCommunityPropsData(d));
    alert(d)
  }
  return (
    <div className='communityOutLine'>
      {data.map((d, index)=>(
        <Link to='/communitydetail' onClick={()=>{handleCommunityPropsData(d)}} key={index} className='communityCard'>
          <div>{d.commucontents}</div>
          <div>{d.commutiem}분 전</div>
          <div>{d.commutag.join(", ")}</div>
          <div><FontAwesomeIcon icon={faComments}/>댓글 {d.repnum}</div>
        </Link>
      ))}
        <Link to="/write" className="writemark"><FontAwesomeIcon icon={faPen}/></Link>
    </div>
  );
}

export default Community;
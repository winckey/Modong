import React, { useEffect, useState } from 'react';
import "../../../style/_myCommunity.scss"
import { Link } from 'react-router-dom';

import axios, {AxiosResponse, AxiosError} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';

import RootState from "../../../reducer/reducers.tsx"
import {datetrans} from '../../../actions/TimeLapse.tsx'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export interface datatype  {
    id: number,
    description: string,
    userId: number,
    createdDate: Date,
    modifiedDate: Date,
    commentNumber: number
  }


function MyCommunity() {
    const dispatch = useDispatch();
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })
    const[ myCommunityList, setMyCommunityList ] = useState([]);

    const handleCommunityPropsData=(d:datatype)=>{
        dispatch(actionCreators.setCommunityPropsData(d));
    }
    const handleDelCommunity = (myCommunityId:number) =>{
        alert("삭제하시겠습니까?")
        axios.delete(`/board-service/`,{data:{id:myCommunityId}})
        .then((response:AxiosResponse) => {
            console.log(response.data, "나의 게시판 나가기")
        })
        .catch((error:AxiosError) => {
            console.log(error, "에러");
        })
    }
    const getMycommunityList=()=>{
        axios.get(`/board-service/${userId}`)
        .then((response:AxiosResponse) => {
            console.log(response.data, "from qoekf");
            setMyCommunityList(response.data.content)
            })
            .catch((error:AxiosError) => {
            console.log(error, "에러");
            })
    }
    useEffect(()=>{
        getMycommunityList();
    },[])
    return (
        <div className='myCommunity'>
            {myCommunityList.map((data:datatype) =>(
                <div className='shadow' key={data.id}>
                    <div>{data.description}</div>
                    <div>{datetrans(data.createdDate)}</div>
                    <Link to="/communitydetail" onClick={()=>{handleCommunityPropsData(data)}}>
                        <div>상세보기</div>
                    </Link>
                    <FontAwesomeIcon onClick={()=>{handleDelCommunity(data.id)}} className='rightExitIcon' icon={faRightToBracket}/>
                </div>
            ))}
        </div>
    );
}

export default MyCommunity;
import React, { useEffect, useState } from 'react';
import "../../../style/_myCommunity.scss"
import { Link } from 'react-router-dom';

import axios, {AxiosResponse, AxiosError} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';

import RootState from "../../../reducer/reducers.tsx"
import { datetrans } from '../../../actions/_TimeLapse.tsx'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { communitytype } from "../../../actions/_interfaces.tsx"

function MyCommunity() {
    const dispatch = useDispatch();
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })

    const[ myCommunityList, setMyCommunityList ] = useState<communitytype[]>([]);

    const handleCommunityPropsData=(d:communitytype)=>{
        dispatch(actionCreators.setCommunityPropsData(d));
    }
    const handleDelCommunity = (myCommunityId:number) =>{
        axios.delete(`/board-service/`,{data:{id:myCommunityId}})
        .then((response:AxiosResponse) => {
            getMycommunityList();
        })
        .catch((error:AxiosError) => {
            alert("오류 입니다 관리자와 이야기해주세요!")
        })
    }
    const getMycommunityList=()=>{
        axios.get(`/board-service/${userId}`)
        .then((response:AxiosResponse) => {
            setMyCommunityList(response.data.content)
            })
    }
    
    useEffect(()=>{
        getMycommunityList();
    },[])

    return (
        <div className='myCommunity'>
            {myCommunityList.map((data:communitytype) =>(
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
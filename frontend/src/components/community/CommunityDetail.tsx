import React, { useEffect, useState } from 'react';

import { useSelector , useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import RootState from "../reducer/reducers.tsx"

import axios, {AxiosResponse, AxiosError} from "axios";

import "../../style/_communityDetail.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faComments } from "@fortawesome/free-solid-svg-icons";

export interface replyData{
    id: number,
    boardId: number,
    description: string,
    deleted: boolean,
    userId: number
} 

function CommunityDetail() {
    const communityPropsData = useSelector((state:RootState) => {
        return state.propsData.data.communityPropsData
      })
    const [replyDatas, setReplyDatas] = useState<replyData[]>([]);
    const [replytxt, setReplytxt] = useState<string>("");
    const handleReplytxt= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setReplytxt(e.target.value);
    }
    const handleReplyDel=(replyid:number)=>{
        const deldata = {
            data:{
                boardId: communityPropsData.id,
                description: replytxt,
                id: replyid,
                userId: 1
            }
        }
        axios.delete(`/board-service/comment`, deldata,
        )
        .then((response:AxiosResponse) => {
            console.log(response.data, "from login");
            handleUpdatadata();
        })
        .catch((error:AxiosError) => {
            console.log(error, "에러");
        })
    }
    const handleReplySubmit=()=>{
        axios.post(`/board-service/comment`, {
            boardId: communityPropsData.id,
            description: replytxt,
            id: 0,
            userId: 1
        },
        {
            headers: {
                "Content-type": "application/json",
                Accept: "*/*",
            },
        })
        .then((response:AxiosResponse) => {
            console.log(response.data, "from login");
            handleUpdatadata();
        })
        .catch((error:AxiosError) => {
            console.log(error, "에러");
        })
    }
    const handleUpdatadata=()=>{
        axios.get(`/board-service/${communityPropsData.id}`)
        .then((response:AxiosResponse) => {
            setReplyDatas(response.data);
            console.log(response.data, "from login");
        })
        .catch((error:AxiosError) => {
            console.log(error, "에러");
        })
    }
    useEffect(()=>{
        handleUpdatadata();
    }, [])
    return (
        <div className='communityDetailOutLine'>
            <div className='userdiv'>
                <div><img src={ require('../../assets/dd.png') } alt="사진"/></div>
                <div>
                    <div>강냉이머신</div>
                    <div>구서동</div>
                </div>
            </div>
            <div className='contentsdiv'>
                <div>{communityPropsData.description}</div>
                <div>{communityPropsData.createdDate}분 전</div>
                {/* <div>{communityPropsData.commutag.join(", ")}</div> */}
            </div>
            <div className='replywrite'>
                <input onChange={handleReplytxt} value={replytxt} placeholder="댓글을 입력해주세요" type="text"/>
                <div onClick={handleReplySubmit}><FontAwesomeIcon icon={faPen}/></div>
            </div>
            {replyDatas.map((reData, index)=>(
            <div className='userdiv2' key={reData.id}>
                <div><img src={ require('../../assets/dd.png') } alt="사진"/></div>
                <div>
                    <div>{reData.userId.toString()}</div>
                    <div>구서동</div>
                    <div>{reData.description}</div>
                </div>
                {reData.userId === 1 &&
                    <div className='replyDelBtn' onClick={()=>{handleReplyDel(reData.id)}}>삭제하기</div>
                }
            </div>
            ))}
        </div>
    );
}

export default CommunityDetail;
import React, { useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import {datetrans} from '../../actions/_TimeLapse.tsx'
import RootState from "../../reducer/reducers.tsx"

import axios, {AxiosResponse, AxiosError} from "axios";

import "../../style/_communityDetail.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

import { commentsDataType } from "../../actions/_interfaces.tsx"

function CommunityDetail() {
    const communityPropsData = useSelector((state:RootState) => {
        return state.propsData.data.communityPropsData
      }) 
    const [replyDatas, setReplyDatas] = useState<commentsDataType[]>([]);
    const [replytxt, setReplytxt] = useState<string>("");
    const [usernick, setUserNick] = useState<string>("");
    const [userimg, setUserImg] = useState<string>("");
    const [userLoc, setUserLoc] = useState<string>("");
    const handleReplytxt= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setReplytxt(e.target.value);
    }
    const userId = useSelector<number>((state:RootState) => {
        return state.accounts.data.user.id
      })
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
            console.log(response.data, "글지우기");
            handleUpdatedata();
        })
        .catch((error:AxiosError) => {
            alert("오류입니다 관리자와 이야기 해주세요!")
            console.log(error, "에러");
        })
    }
    const handleReplySubmit=()=>{
        if (replytxt === ""){
            alert("메시지를 입력해주세요!")
        }else{
            axios.post(`/board-service/comment`, {
                boardId: communityPropsData.id,
                description: replytxt,
                id: 0,
                userId: userId
            },
            {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                },
            })
            .then((response:AxiosResponse) => {
                console.log(response.data, "글쓰기");
                handleUpdatedata();
                setReplytxt("");
            })
            .catch((error:AxiosError) => {
                console.log(error, "에러");
                alert("에러입니다 관리자와 이야기 해주세요")
            })
        }
    }
    const handleUpdatedata=()=>{
        axios.get(`/board-service/${communityPropsData.id}/${communityPropsData.userId}`)
        .then((response:AxiosResponse) => {
            setReplyDatas(response.data.commentList.content);
            setUserNick(response.data.userInfo.nickname);
            setUserImg(response.data.userInfo.image);
            setUserLoc(response.data.userInfo.dongDto.dong);
            console.log(response.data, "글가져오기");
        })
        .catch((error:AxiosError) => {
            console.log(error, "에러");
            alert("오류입니다 관리자와 이야기 해주세요!")
        })
    }
    useEffect(()=>{
        handleUpdatedata();
    }, [])

    const handleKeyPress = (event:any) => {
        if (event.key === 'Enter') {
            handleReplySubmit();
        }
    };

    return (
        <div className='communityDetailOutLine'>
            <div className='userdiv'>
                <div className=''><img src={ userimg ||require('../../assets/pingu.png') } alt="사진"/></div>
                <div>
                    <div>{usernick}</div>
                    <div>{userLoc}</div>
                </div>
            </div>
            <div className='contentsdiv'>
                <div>{communityPropsData.description}</div>
                <div>{datetrans(communityPropsData.createdDate.toString())}</div>
            </div>
            <div className='replywrite'>
                <input onChange={handleReplytxt} value={replytxt} onKeyPress={handleKeyPress} 
                placeholder="댓글을 입력해주세요" type="text"/>
                <div onClick={handleReplySubmit}><FontAwesomeIcon icon={faComments}/></div>
            </div>
            {replyDatas.map((reData:commentsDataType)=>(
            <div className='userdiv2' key={reData.id}>
                <div><img src={reData.user.image|| require('../../assets/pingu.png') } alt="사진"/></div>
                <div>
                    <div>{reData.user.nickname||""}</div>
                    <div>{reData.description||""}</div>
                </div>
                {reData.user.id === userId &&
                    <div className='replyDelBtn' onClick={()=>{handleReplyDel(reData.id)}}>삭제하기</div>
                }
            </div>
            ))}
        </div>
    );
}

export default CommunityDetail;
import React, { useState } from 'react';

import { useSelector , useDispatch } from "react-redux";
import actionCreators from '../actions/actionCreators.tsx';

import RootState from "../reducer/reducers.tsx"

import "../../style/_communityDetail.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faComments } from "@fortawesome/free-solid-svg-icons";
function CommunityDetail() {
    const communityPropsData = useSelector((state:RootState) => {
        return state.propsData.data.communityPropsData
      })
    const [replytxt, setReplytxt] = useState<string>("");
    const handleReplytxt= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setReplytxt(e.target.value);
    }
    const handleReplySubmit=()=>{
        alert(replytxt)
    }
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
                <div>{communityPropsData.commucontents}</div>
                <div>{communityPropsData.commutiem}분 전</div>
                <div>{communityPropsData.commutag.join(", ")}</div>
            </div>
            <div className='replywrite'>
                <input onChange={handleReplytxt} value={replytxt} placeholder="댓글을 입력해주세요" type="text"/>
                <div onClick={handleReplySubmit}><FontAwesomeIcon icon={faPen}/></div>
            </div>
            <div className='userdiv2'>
                <div><img src={ require('../../assets/dd.png') } alt="사진"/></div>
                <div>
                    <div>강냉이머신</div>
                    <div>구서동</div>
                    <div>contents</div>
                </div>
            </div>
        </div>
    );
}

export default CommunityDetail;
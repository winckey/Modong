import React, { useRef } from 'react';
import '../../style/_profile.scss'
import Modal from '../modal/ProfileEditModal.tsx'
import { useSelector, useDispatch } from 'react-redux';
import Rootstate from '../../reducer/reducers.tsx';
import axios from 'axios';
import actionCreators from '../../actions/actionCreators.tsx';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state:Rootstate) => {
        return state.accounts.data.user
    });

    const fileInput = useRef(null);

    // 프로필 이미지 수정
    const handleProfileImage = (e:any) => {
        var image = new FormData();
        image.append("image", e.target.files[0]);
        axios.put(`/user-service/users/image?userId=${user.id}`,
        image,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                // 'Content-Type': 'multipart/form-data'
            }
        }
        ).then((res)=>{
            dispatch(actionCreators.setUser(res.data));
        }).catch((err)=>{
            alert("오류입니다 관리자와 이야기 해주세요")
        })
    };
    return (
        <div className="profile">
            <Modal/>
            <div>
                <img onClick={()=>{fileInput.current.click()}} 
                src={ user.image ? user.image:require('../../assets/pingu.png') } alt="프로필"/>
            </div>
            <input  className="dishidden"type='file' accept='image/*'
                 name='file' ref={fileInput} onChange={handleProfileImage}></input>
            <div>
                <div>
                    <p>닉네임</p>
                    <p>{user.nickname}</p>
                </div>
                <div>
                    <p>이메일 주소</p>
                    <p>{user.userId}</p>
                </div>
                <div>
                    <p>전화번호</p>
                    <p>{user.phone}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
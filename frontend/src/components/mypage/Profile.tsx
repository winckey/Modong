import React from 'react';
import '../../style/_profile.scss'
import Modal from '../modal/ProfileEditModal.tsx'
import { useSelector } from 'react-redux';
import Rootstate from '../../reducer/reducers.tsx'

function Profile() {

    const user = useSelector((state:Rootstate) => {
        return state.accounts.data.user
    });

    const dong = useSelector((state:Rootstate) => {
        return state.address.data.dong
    });

      
    // 프로필 이미지 수정
    const handleProfileImage = () => {

    };

    return (
        <div className="profile">

            
            <Modal/>
            
            <div>
                <img onClick={handleProfileImage} 
                src={ require('../../assets/pingu.png') } alt="사진"/>
                <button className="editButton" onClick={handleProfileImage}>+</button>
            </div>

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
                    <p>주소</p>
                    <p>{dong}</p>
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
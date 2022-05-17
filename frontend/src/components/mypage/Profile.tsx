import React, { useState, useRef } from 'react';
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
    const dong = useSelector((state:Rootstate) => {
        return state.address.data.dong
    });

    const [profileImage, setProfileImage] = useState<string>("");
    const fileInput = useRef(null);

    

    // 프로필 이미지 수정
    const handleProfileImage = (e) => {
        // console.log(e.target.files[0].size);
        const image = new FormData();
        image.append('image', e.target.files[0]);
        // console.log("image는 몬가요", image);

        axios.put("/user-service/users/image",
        {
            userId: user.id,
            image: image
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                // 'Content-Type': 'multipart/form-data'
            }
        }
        ).then((res)=>{
            console.log(res.data);
            // const userInfo = {
            //     ...user,
            //     image: res.data.image
            // };
            // dispatch(actionCreators.setUser(userInfo));
        }).catch((err)=>{
            console.log("이미지 업로드 실패", err);
        })


    };

    return (
        <div className="profile">

            <Modal/>
            
            <div>
                
                <img onClick={()=>{fileInput.current.click()}} 
                src={ user.image ? user.image:require('../../assets/pingu.png') } alt="프로필"/>

                {/* <input type='file' accept='image/*'
                 name='file' ref={fileInput} onChange={handleProfileImage}></input> */}

                {/* <button className="editButton" onClick={handleProfileImage}>+</button> */}
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
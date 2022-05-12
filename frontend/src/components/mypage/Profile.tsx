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


    // redux에 사용자 이미지 정보 업뎃
    const userInfo = {
        ...user,
        image: profileImage
    };


    const handleChangeProfileImage = (e) => {
        // console.log(e.target.value, "사진 경로!!");
        setProfileImage(URL.createObjectURL(e.target.files[0]));
        console.log(URL.createObjectURL(e.target.files[0]), "링크로?");
        console.log(profileImage, "profileImage");

        axios.put("/user-service/users/image",
        {
            userId: user.id,
            image: profileImage
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            console.log(res.data);
            dispatch(actionCreators.setUser(userInfo));
        }).catch((err)=>{
            console.log(profileImage);
            console.log("이미지 업로드 실패", err.data);
        })



    }

    // 프로필 이미지 수정
    // const handleProfileImage = () => {
    //     // const image = new FormData();
    //     // image.append('img', profileImage)
    //     axios.put("/user-service/users/image",
    //     {
    //         userId: user.id,
    //         image: profileImage
    //     },
    //     {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }).then((res)=>{
    //         console.log(res.data);
    //         dispatch(actionCreators.setUser(userInfo));
    //     }).catch((err)=>{
    //         console.log("이미지 업로드 실패", err.data);
    //     })


    // };

    return (
        <div className="profile">

            <Modal/>
            
            <div>
                
                <img onClick={()=>{fileInput.current.click()}} 
                src={ user.image ? user.image:require('../../assets/pingu.png') } alt="프로필"/>

                {/* <img onClick={()=>{fileInput.current.click()}} 
                src={ profileImage} alt="프로필"/> */}

                <input type='file' style={{display:'none'}} accept='image/jpg,impge/png,image/jpeg'
                 name='profile_img' ref={fileInput} onChange={handleChangeProfileImage}></input>

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
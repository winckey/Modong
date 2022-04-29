import React from 'react';
import '../../style/_profile.scss'


function Profile() {
    return (
        <div className="profile">

            <div>
                <button>수정</button>
            </div>

            <div>
                <img src={ require('../../assets/dd.png') } alt="사진"/>
                <button>+</button>
            </div>

            <div>
                <div>
                    <p>닉네임</p>
                    <p>문현동 강냉이</p>
                </div>
                <div>
                    <p>이메일 주소</p>
                    <p>ssafy@naver.com</p>
                </div>
                <div>
                    <p>주소</p>
                    <p>구서동</p>
                </div>
                <div>
                    <p>전화번호</p>
                    <p>101-1234-9716</p>
                </div>
            </div>

        </div>
    );
}

export default Profile;
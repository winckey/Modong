import React from 'react';
import { Link } from 'react-router-dom';

import "../style/_chat.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRightToBracket, faBowlFood } from '@fortawesome/free-solid-svg-icons';

const data = [{chatName:"1번방", memberCount:10, category:1}, {chatName:"2번방", memberCount:2, category:2},{chatName:"3번방", memberCount:20, category:1}]
const handleExit=()=>{
  alert("삭제하시겠습니까?")
}

function Chat() {
  return (
    <div className='chatOutLine'>
        {data.map((d, index)=>(
          <Link to='/chatdetail' className='chatCard'>
            <div className='leftChattxt'>{d.chatName}</div>
            <FontAwesomeIcon onClick={handleExit} className='rightChatExitIcon' icon={faRightToBracket}/>
            {d.category == 1 && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faBowlFood}/>}
            {d.category == 2 && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faTruck}/>}
            <div className='rightChattxt'>참여인원 : {d.memberCount}명</div>
          </Link>
        ))}
    </div>
  );
}

export default Chat;
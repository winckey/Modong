import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import "../style/_chat.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRightToBracket, faBowlFood } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal/ChatExitModal.tsx'


export default function Chat() {
  
  const [ modalOpen, setModalOpen] = useState(false);
  const data = [{chatName:"1번방", memberCount:10, category:1}, {chatName:"2번방", memberCount:2, category:2},{chatName:"3번방", memberCount:20, category:1}]

    const openModal = () => {
      console.log('open`~~~')
      setModalOpen(true);
      console.log('얍')
    };
    const closeModal = () => {
      console.log('close~')
      setModalOpen(false);
    };

  return (
    <div>
      <div className='chatOutLine'>
          {data.map((d, index)=>(
            <Link key={index} to='/chatdetail' className='chatCard'>
              <div className='leftChattxt'>{d.chatName}</div>
                <FontAwesomeIcon  className='rightChatExitIcon' icon={faRightToBracket}/>
                <button onClick={openModal}>ddd</button>
                {d.category == 1 && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faBowlFood}/>}
                {d.category == 2 && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faTruck}/>}
              <div className='rightChattxt'>참여인원 : {d.memberCount}명</div>
            </Link>
          ))}
      </div>

      <div>
        <Modal open={modalOpen}  close={closeModal} info={data}>
        </Modal>
      </div>
    
    </div>
  );
}

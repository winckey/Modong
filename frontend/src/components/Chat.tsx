import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import "../style/_chat.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRightToBracket, faBowlFood } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal/ChatExitModal.tsx'
import axios, {AxiosResponse, AxiosError} from "axios";

import { useSelector , useDispatch } from "react-redux";
import actionCreators from './actions/actionCreators.tsx';
import {datetrans} from '../actions/TimeLapse.tsx'
import RootState from "./reducer/reducers.tsx"

export interface chatListType {
    name: string,
    roomId: number,
    type: string,
    numberUser: number
} 

export default function Chat() {
  const [ modalOpen, setModalOpen] = useState(false);
  const [ chatList, setChatList] = useState<chatListType[]>([]);
  const data = [];
  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.userId
  })
  const openModal = () => {
    console.log('open`~~~')
    setModalOpen(true);
    console.log('얍')
  };
  const closeModal = () => {
    console.log('close~')
    setModalOpen(false);
  };
  const handleDelChatRoom =(roomid:number) =>{
    axios.delete(`/chat-service/chat/${roomid}/${userId}`)
      .then((response:AxiosResponse) => {
        console.log(response.data, "채팅 나가기")
      })
      .catch((error:AxiosError) => {
        console.log(error, "에러");
      })
  }
  const getChatList = () =>{
    axios.get(`/chat-service/chat/${userId}`)
      .then((response:AxiosResponse) => {
        console.log(response, "채팅 데이터 가져오기");
        setChatList(response.data)
      })
      .catch((error:AxiosError) => {
        console.log(error, "에러");
      })
  }
  useEffect(()=>{
    getChatList();
  },[])

  return (
    <div>
      <div className='chatOutLine'>
          {chatList.map((d, index)=>(
            <Link key={index} to='/chatdetail' className='chatCard' state={{hi: "hello"}}>
              <div className='leftChattxt'>방이름: {d.name}//방번호:{d.roomId}</div>
                <FontAwesomeIcon  className='rightChatExitIcon' icon={faRightToBracket}/>
                <button onClick={openModal}>나가랏</button>
                {d.type === "공구" && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faBowlFood}/>}
                {d.type === "배달" && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faTruck}/>}
              <div className='rightChattxt'>참여인원 : {d.numberUser}명</div>
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

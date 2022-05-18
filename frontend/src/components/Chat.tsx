import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import "../style/_chat.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRightToBracket, faBowlFood } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal/ChatExitModal.tsx'
import axios, {AxiosResponse, AxiosError} from "axios";

import { useSelector } from "react-redux";
import RootState from "./reducer/reducers.tsx"

import { chatListType } from "../actions/_interfaces.tsx"

export default function Chat() {
  const [ modalOpen, setModalOpen] = useState<boolean>(false);
  const [ chatList, setChatList] = useState<chatListType[]>([]);
  const [ roomName, setRoomName] = useState<string>("기본");

  const userId = useSelector<number>((state:RootState) => {
    return state.accounts.data.user.id
  })

  const openModal = (roomName:string) => {
    setRoomName(roomName);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // 채팅 목록 가져오기
  const getChatList = () =>{
    axios.get(`/chat-service/chat/${userId}`)
      .then((response:AxiosResponse) => {
        setChatList(response.data)
        console.log("방 리스트", response.data)
      })
      .catch((error:AxiosError) => {
        console.log(error, "에러");
      })
  }

  useEffect(()=>{
    getChatList();
  },[])

  return (
    <div className='outerBox'>
      <div className='chatOutLine'>
          {chatList.map((d:chatListType, index:number)=>( 
            <Link key={index} to='/chatdetail' className='chatCard' 
            state={{roomId: d.roomId, name:d.name, type:d.type, numberUser: d.numberUser, userList: d.userList}}>
              <div className='leftChattxt'>{d.name}_{d.roomId}번방</div>
                <FontAwesomeIcon  className='rightChatExitIcon' icon={faRightToBracket} 
                onClick={(e:any)=>{e.preventDefault(); openModal(d.name)}}/>
                <>
                  <Modal open={modalOpen}  close={closeModal} name={roomName} 
                  roomId={d.roomId} userId={userId}>
                  </Modal>
                </>
                {d.type === "ORDER_GROUPW" && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faBowlFood}/>}
                {d.type === "ORDER_DELIVERY" && <FontAwesomeIcon className='leftChatDisplayIcon' icon={faTruck}/>}
              <div className='rightChattxt'>참여인원 : {d.numberUser}명</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

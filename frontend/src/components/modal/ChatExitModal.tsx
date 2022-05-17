import React from 'react';
import '../../style/modal/_Modal.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosResponse, AxiosError } from 'axios';

import { chatListType } from "../../actions/_interfaces.tsx"

export default function ChatExitModal(props:any)  {

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, name, roomId, userId } = props;

  const onCloseModal = (e:any) => {
    if (e.target === e.currentTarget){
      close();
    }
  }

  // 채팅방 나가기
  const handleDelChatRoom =() =>{
    close();
    axios.delete('/chat-service/chat', {
      data: {
        roomId: roomId,
        userId: userId
      }
    },)
      .then((response:AxiosResponse) => {
        console.log(response.data, "채팅 나가기")
        window.location.reload();
      })
      .catch((error:AxiosError) => {
        console.log(error, "에러");
      })
  };


  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'} onClick={onCloseModal}>
    {open ? (
      <section>

        <div style={{margin: "5%"}}>

          <div>
              <div className="icon">
                <FontAwesomeIcon  icon={faCircleExclamation} size="6x" color="#0064FF"/>
              </div>

              <header>
                  <div>{name} 채팅방을</div>
                  <div>나가시겠어요?</div>
              </header>

          </div>

          <main>
            <button onClick={(e:any)=>{e.preventDefault(); handleDelChatRoom();}} >확인</button>
          </main>

        </div>

        

      </section>
    ) : null}
    </div>
  );

}
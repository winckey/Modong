import React, {useEffect} from 'react';
import "../style/_alarm.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { getMessaging, onMessage } from 'firebase/messaging'

const data =[{ contents:"추후 개발 예정입니다."}]
function Alarm(props:any) {
  // useEffect(()=>{
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload)=>{
  //     console.log("fb에서 메시지 받은거", payload.notification);
  //   })
  // });

  return (
    <>
      <div className='alarmOutLine'>
        <div>
        {data.map((d, index)=>(
            <div key={index}>
                <div>{d.contents}</div>
                <div>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
        ))}
        </div>
        <p>전체 삭제</p>
      </div>
      <div onClick={props.closealarm} className='closeboard'/>
    </>
  );
}

export default Alarm;
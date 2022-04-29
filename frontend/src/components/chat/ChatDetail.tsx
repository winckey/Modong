import React, { useState } from 'react';

import "../../style/_chatdetail.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
const data = [{userid:"멍멍이", contents:"내용1", sentTime:10}, {userid:"야옹이", contents:"내용2", sentedTime:20}, {userid:"꽉꽉이", contents:"내용3", sentedTime:30}]
// interface dataProps{
//     userid:string;
//     contents:string;
//     sentTime:number;
// }

function ChatDetail() {
    const [chattxt, setChattxt] = useState<string>("");
    const handleChattxt =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setChattxt(e.target.value);
    }
    const handlechatsubmit=()=>{
        alert(chattxt)
    }
    return (
        <div className='chatDetailOutLine'>
            {data.map((d, index) =>(
                <div className='chatDetailInnerCard' key={index}>
                    { d.userid == "야옹이" ?
                    <div className="myChat">
                        <div className="myChatName">{d.userid}</div>
                        <div>{d.contents}</div>
                        <div>{d.sentedTime}분전</div>
                    </div>
                    :
                    <div className="otherChat">
                        <div className="otherChatName">{d.userid}</div>
                        <div>{d.contents}</div>
                        <div>{d.sentedTime}분전</div>
                    </div>
                    }
                </div>
            ))}
            <div className='chatinput'>
                <input onChange={handleChattxt} value={chattxt} type="text"></input>
                <div onClick={handlechatsubmit}><FontAwesomeIcon icon={faPen}/></div>
            </div>
        </div>
    );
}

export default ChatDetail;
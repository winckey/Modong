import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import {datetrans, datetransnine} from '../../actions/_TimeLapse.tsx'

import "../../style/_chatdetail.scss"
import { useSelector } from "react-redux";
import RootState from "../../reducer/reducers.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosResponse, AxiosError } from 'axios';
import { createRoutesFromChildren } from 'react-router-dom';

// 링크 props 받기
import { useLocation } from 'react-router-dom'

interface dataProps{
        userId:number;
        userName:string;
        message:string;
        date:number;
};
    
function ChatDetail() {
    //props로 받은 data
    const location = useLocation();
    const { roomId, name, type, numberUser, userList } = location.state;
    
    // 채팅 input 상자
    const [chattxt, setChattxt] = useState<string>("");
    const handleChattxt =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setChattxt(e.target.value);
    }


    // 대화 기록 담은 배열
    const [contents, setContents] = useState<dataProps[]>([]);
    const [ historyMessages, setHistoryMessages] = useState<dataProps[]>([]);


    const userId = useSelector<number>((state:RootState) => {
        return state.accounts.data.user.id
    })


    const userName = useSelector<number>((state:RootState) => {
        return state.accounts.data.user.userId
    })


    const [state, setState] = useState<any>({
        loading: false,
        roomId: roomId,
        height: null,
        chatDiv: null,
        page: 0,
        bottom_flag: true,
        pre_diffHeight: 0,
        isEndOfMessage: false
    });


    // websocket 연결
    const socketJs = new SockJS("http://k6e102.p.ssafy.io:8000/ws-stomp");
    const stomp = Stomp.over(socketJs);
    
    // stomp 연결, 구독해서 정보 주고 받음
    useEffect(()=>{
        stomp.connect({}, ()=> {
            stomp.subscribe(`/sub/chatting/room/${state.roomId}`, (data:any)=>{
                const newMessage: dataProps = JSON.parse(data.body);
                addMessage(newMessage);
            })
        });
    }, []);


    useEffect(()=>{
        getHistory();     
    },[]);


    const addMessage = (message:any) => {
        setContents(prev=>[...prev,message]);
    };  



    // 채팅 기록 불러오기
    const getHistory = () => {
        axios.get(`chat-service/chat/message/${state.roomId}`)
        .then((res:AxiosResponse)=>{
            setHistoryMessages(res.data);
        })
        .catch((err:AxiosError)=>{
            alert("오류입니다 관리자와 이야기 해주세요!")
        })


    };
    


    const sendMessage = () => {
        if (chattxt === ""){
            alert("메시지를 입력하세요")
        }else{
            axios.post("chat-service/chat/message",
                {
                    message: chattxt,
                    roomId: state.roomId,
                    userId: userId
                },
                {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "*/*",
                    },
                }).then((res:AxiosResponse)=>{
                    const newMessage: dataProps = {message: chattxt, roomId: state.roomId , userId: userId, userName: userName, date: new Date()};
                    stomp.send("/pub/chat/chatting",{},
                    JSON.stringify(newMessage));
                    setChattxt("");
                })
                .catch((error:AxiosError)=>{
                    alert("오류입니다 관리자에게 문의 해주세요")
                })
            }
    };


    const handleKeyPress = (e:any) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className='chatDetailOutLine'>
            <div className='chatInnerBox'>
                {/* 이전 채팅 기록 */}
                {historyMessages.map((d, index) =>(
                    <div className='chatDetailInnerCard' key={index}>
                        { d.userId === userId ?
                        <div className="myChat">
                            <div className="myChatName">{d.userName}</div>
                            <div>{d.message}</div>
                            <div>{datetrans(d.date)}</div>
                        </div>
                        :
                        <div className="otherChat">
                            <div className="otherChatName">{d.userName}</div>
                            <div>{d.message}</div>
                            <div>{datetrans(d.date)}</div>
                        </div>
                        }
                    </div>
                ))}
                


                {/* 실시간 채팅 */}
                {contents.map((d, index) =>(
                    <div className='chatDetailInnerCard' key={index}>
                        { d.userId === userId ?
                        <div className="myChat">
                            <div className="myChatName">{d.userName}</div>
                            <div>{d.message}</div>
                            <div>{datetransnine(d.date)}</div>
                        </div>
                        :
                        <div className="otherChat">
                            <div className="otherChatName">{d.userName}</div>
                            <div>{d.message}</div>
                            <div>{datetransnine(d.date)}</div>
                        </div>
                        }
                    </div>
                ))}
            </div>


            
            <div className='chatinput'>
                <input onChange={handleChattxt} value={chattxt||""} 
                type="text" onKeyPress={handleKeyPress}></input>
                <div onClick={sendMessage}><FontAwesomeIcon icon={faComment}/></div>
            </div>
        </div>
    );
}

export default ChatDetail;

import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';



import "../../style/_chatdetail.scss"
import actionCreators from './actions/actionCreators.tsx';
import { useSelector } from "react-redux";
import RootState from "../../reducer/reducers.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosResponse } from 'axios';
import { createRoutesFromChildren } from 'react-router-dom';

// 링크 props 받기
import { useLocation } from 'react-router-dom'


const data = [{userid:"멍멍이", contents:"내용1", sentTime:10}, {userid:"야옹이", contents:"내용2", sentedTime:20}, {userid:"꽉꽉이", contents:"내용3", sentedTime:30}]

// interface dataProps{
//     userid:string;
//     contents:string;
//     sentTime:number;
// }



function ChatDetail() {

    //props로 받은 data
    const location = useLocation();
    const { hi } = location.state;
    // console.log("props 넘어오니", hi);
    
    // 채팅 input 상자
    const [chattxt, setChattxt] = useState<string>("");
    const handleChattxt =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setChattxt(e.target.value);
    }

    const userId = useSelector<number>((state:RootState) => {
        return state.accounts.data.user.userId
      })

    
    const [state, setState] = useState({
        loading: false,
        messages: [],
        historyMessages: [],
        roomId: 7,
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
    stomp.debug = function() {};
    console.log("stomp 연결했쥐렁")
    
    useEffect(()=>{
        console.log("구독 시작 전!")
        stomp.connect({}, ()=> {
            stomp.subscribe(`/sub/chat/room/${state.roomId}`, (chat)=>{
                const content = JSON.parse(chat.body);
                setState({...state, messages:content});
                console.log("연결완료", state.messages)
            })
        });
    }, [chattxt]);



    // 채팅 기록 불러오기
    const getHistory = () => {

        axios.get(`chat-service/chat/message/${state.roomId}`)
        .then((res)=>{
            console.log("채팅 기록", res.data);
        })
        .catch((err)=>{
            console.log("getHistory에러", err);
        })


    };
    



    const sendMessage = () => {
        if (chattxt.trim()) {


            // axios.post("chat-service/chat/message",
            // {
            //     message: chattxt,
            //     roomId: state.roomId,
            //     userId: userId
            // },
            // {
            //     headers: {
            //         "Content-type": "application/json",
            //         Accept: "*/*",
            //     },
            // })

            stomp.send("pub/chat/message",{},
            JSON.stringify({'message': chattxt, 'roomId': state.roomId , 'userId': userId}));
            setChattxt(null);

        }
    };

    return (
        <div className='chatDetailOutLine'>
            {data.map((d, index) =>(
                <div className='chatDetailInnerCard' key={index}>
                    { d.userid === userId ?
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
                <div onClick={sendMessage}><FontAwesomeIcon icon={faPen}/></div>
            </div>
        </div>
    );
}

export default ChatDetail;
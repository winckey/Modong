import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../style/_deliveryWrite.scss"

import { useSelector , useDispatch } from "react-redux";

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import axios, {AxiosResponse, AxiosError } from 'axios';

import RootState from "../../reducer/reducers.tsx"
import actionCreators from "../../actions/actionCreators.tsx"

function DeliveryWrite() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const[ deliveryURL, setDeliveryURL ] = useState<string>("");
    const[ deliveryTitle, setDeliveryTitle ] = useState<string>("");
    const[ deliveryTime, setDeliveryTime ] = useState<Date>(new Date);
    const[ deliveryLoc, setDeliveryLoc ] = useState<string>("");
    const userId = useSelector((state:RootState) => {
        return state.accounts.data.user.id
    })
    const handleDeliveryLoc= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setDeliveryLoc(e.target.value);
    }
    const handleURLchange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setDeliveryURL(e.target.value);
    }
    const handleTitlechange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setDeliveryTitle(e.target.value);
    }
    const handleSubmit=()=>{
        if(deliveryTitle === ""){
            alert("가게 이름을 정확히 다시 입력해주세요")
        }else if(deliveryURL.substring(0, 25) !== "https://www.yogiyo.co.kr/"){
            alert("요기요에서 url을 가져와 정확히 다시 입력해주세요")
        }else if(deliveryLoc === ""){
            alert("위치를 정확히 다시 입력해주세요")
        }else if(deliveryTime<=new Date()){
            alert("마감시간을 다시 지정해주세요")
        }else {
            axios.post('/board-service/group-delivery',
                {
                    closeTime: deliveryTime,
                    pickupLocation: deliveryLoc,
                    storeName: deliveryTitle,
                    url: deliveryURL,
                    userId: userId
                },
                {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "*/*",
                    },
                }
            )
            .then((response:AxiosResponse) => {
                console.log(response.data, "배달 생성");
                dispatch(actionCreators.setFooterSelected(1));
                navigate("/");
            })
            .catch((error:AxiosError) => {
                console.log(error);
                alert("오류입니다 관리자와 이야기 해주세요")
            })
        }
    }
    return (
        <div className='dvoutLine'>
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={deliveryTitle||""}
            label="가게명"
            onChange={handleTitlechange}
            />
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={deliveryURL||""}
            label="URL주소"
            onChange={handleURLchange}
            />
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={deliveryLoc||""}
            label="수령지"
            onChange={handleDeliveryLoc}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props:any) => <TextField fullWidth {...props} />}
                    label="마감시간"
                    value={deliveryTime}
                    onChange={(newValue) => {
                        setDeliveryTime(newValue);
                    }}
                />
            </LocalizationProvider>
            <a href="#" onClick={()=>{window.open(deliveryURL||"https://www.yogiyo.co.kr/mobile/#/")}}> 이 주소가 맞나요?</a>
            <div className='button' onClick={()=>{handleSubmit()}}>생성하기</div>
        </div>
    );
}

export default DeliveryWrite;
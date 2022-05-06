import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "../../style/_deliveryWrite.scss"

import { useSelector , useDispatch } from "react-redux";

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import axios, {AxiosResponse, AxiosError } from 'axios';

import RootState from "../../reducer/reducers.tsx"

// export interface userType{
//     age: number
//     banned: boolean
//     date_create: string
//     deleted: boolean
//     dongDto: any
//     id: number
//     image: any
//     nickname: string
//     phone: string
//     userId: string
// }

function DeliveryWrite() {
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
        // console.log({closeTime: deliveryTime,
        //     pickupLocation: deliveryLoc,
        //     storeName: deliveryTitle,
        //     url: deliveryURL,
        //     userId: userId})
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
          })
          .catch((error:AxiosError) => {
            console.log(error);
          })
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
                    renderInput={(props) => <TextField fullWidth {...props} />}
                    label="마감시간"
                    value={deliveryTime}
                    onChange={(newValue) => {
                        setDeliveryTime(newValue);
                    }}
                />
            </LocalizationProvider>
            <a href="#" onClick={()=>{window.open(deliveryURL||"https://www.yogiyo.co.kr/mobile/#/")}}> 이 주소가 맞나요?</a>
            <Link to="/" className='button' onClick={()=>{handleSubmit()}}>생성하기</Link>
        </div>
    );
}

export default DeliveryWrite;
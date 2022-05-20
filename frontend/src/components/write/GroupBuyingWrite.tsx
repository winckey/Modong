import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../style/_groupBuyingWrite.scss"

import { useSelector , useDispatch } from "react-redux";

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import axios, {AxiosResponse, AxiosError } from 'axios';

import RootState from "../../reducer/reducers.tsx"
import actionCreators from "../../actions/actionCreators.tsx"

function GroupBuyingWrite() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [productName, setProductName] =useState<string>("");
    const [productURL, setProductURL] =useState<string>("");
    const [productCost, setProductCost] =useState<string>("");
    const [GroupBuyingTime, setGroupBuyingTime] = useState<Date>(new Date());
    const [productLoc, setProductLoc] = useState<string>("");
    const handleURLchange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setProductURL(e.target.value);
    }
    const handleNamechange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setProductName(e.target.value);
    }
    const handleCostchange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setProductCost(e.target.value);
    }
    const handleLocchange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setProductLoc(e.target.value);
    }
    const userId = useSelector((state:RootState) => {
        return state.accounts.data.user.id
    })
    const handleSubmit=()=>{
        if(productName === ""){
            alert("물건 이름을 정확히 다시 입력해주세요")
        }else if(productURL === ""){
            alert("url을 정확히 다시 입력해주세요")
        }else if(Number.isNaN(Number(productCost)) || productCost === ""){
            alert("가격을 정확히 다시 입력해주세요")
        }else if(productLoc === ""){
            alert("위치를 정확히 다시 입력해주세요")
        }else if(GroupBuyingTime<=new Date()){
            alert("마감시간을 다시 지정해주세요")
        }else{
            axios.post('/board-service/group-purchase',
                {
                    closeTime: GroupBuyingTime,
                    pickupLocation: productLoc,
                    price:productCost,
                    productName: productName,
                    url: productURL,
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
                dispatch(actionCreators.setFooterSelected(1));
                navigate("/");
            })
            .catch((error:AxiosError) => {
                alert("오류입니다 관리자와 이야기 해주세요")
            })
        }
    }
    return (
        <div className='gboutLine'>
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={productName||""}
            label="물품명"
            onChange={handleNamechange}
            />
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={productURL||""}
            label="URL주소"
            onChange={handleURLchange}
            />
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={productCost||""}
            label="가격"
            onChange={handleCostchange}
            />
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={productLoc||""}
            label="수령지"
            onChange={handleLocchange}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props:any) => <TextField fullWidth {...props} />}
                    label="마감시간"
                    value={GroupBuyingTime}
                    onChange={(newValue) => {
                        setGroupBuyingTime(newValue);
                    }}
                />
            </LocalizationProvider>
            <a href="#" onClick={()=>{window.open(productURL||"https://www.naver.com/")}}> 이 주소가 맞나요?</a>
            <div className='button' onClick={handleSubmit}>생성하기</div>
        </div>
    );
}

export default GroupBuyingWrite;
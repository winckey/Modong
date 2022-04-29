import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "../../style/_deliveryWrite.scss"


import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function DeliveryWrite() {
    const[ deliveryURL, setDeliveryURL ] = useState<string>("");
    const[ deliveryTime, setDeliveryTime ] = useState<Date>(null);
    const handleURLchange= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setDeliveryURL(e.target.value);
    }
    const handleSubmit=()=>{
        alert(deliveryURL);
    }
    return (
        <div className='dvoutLine'>
            <TextField fullWidth
            margin="normal"
            id="outlined-name"
            value={deliveryURL||""}
            label="가게명"
            onChange={handleURLchange}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="마감시간"
                    value={deliveryTime||null}
                    onChange={(newValue) => {
                        setDeliveryTime(newValue);
                    }}
                    renderInput={(params) => <TextField margin="normal" fullWidth {...params} />}
                />
            </LocalizationProvider>
            <a href={deliveryURL}> 이 주소가 맞나요?</a>
            <Link to="/" className='button' onClick={()=>{handleSubmit()}}>생성하기</Link>
        </div>
    );
}

export default DeliveryWrite;
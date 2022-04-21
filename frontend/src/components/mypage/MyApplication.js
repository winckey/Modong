import React, { useState } from 'react';
import MyApplicationDelivery from './MyApplication/MyApplicationDelivery';
import MyApplicationGroupBuying from './MyApplication/MyApplicationGroupBuying';
function MyApplication() {
    const [MAcategory, setMAcategory] = useState(1);
    const ChangeMAcategory = (catenum) =>{
        setMAcategory(catenum)
    }
    return (
        <div>
            <p>나의 신청</p>
            <button onClick={() => {ChangeMAcategory(1)}}>배달내역</button>
            <button onClick={() => {ChangeMAcategory(2)}}>공구내역</button>
            {MAcategory === 1
            ? <MyApplicationDelivery/>
            : <MyApplicationGroupBuying/>}
        </div>
    );
}

export default MyApplication;
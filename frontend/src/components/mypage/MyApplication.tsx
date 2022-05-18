import React, { useState } from 'react';
import MyApplicationDelivery from './MyApplication/MyApplicationDelivery.tsx';
import MyApplicationGroupBuying from './MyApplication/MyApplicationGroupBuying.tsx';

import "../../style/_myApplication.scss"

function MyApplication() {
    const [MAcategory, setMAcategory] = useState<number>(1);
    const ChangeMAcategory = (catenum:number) =>{
        setMAcategory(catenum)
    }
    
    return (
        <div className='applicationOutLine'>
            <div className='applicationNav'>
                <div onClick={() => {ChangeMAcategory(1)}}>배달내역</div>
                <div onClick={() => {ChangeMAcategory(2)}}>공구내역</div>
                <div className={(MAcategory === 1 ? 'deliverySelected':'groupBuyingSelected')}></div>
            </div>
            {MAcategory === 1
            ? <MyApplicationDelivery/>
            : <MyApplicationGroupBuying/>}
        </div>
    );
}

export default MyApplication;
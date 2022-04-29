import React, { useState } from 'react';
import MyCommunity from './MyCommunity/MyCommunity.tsx';
import MyDelivery from './MyCommunity/MyDelivery.tsx';
import MyGroupBuying from './MyCommunity/MyGroupBuying.tsx';

import "../../style/_myCommunityRecord.scss"

function MyCommunityRecord() {
    const [MCcategory, setMCcategory] = useState<number>(1);
    const [categoryClassName, setcategoryClassName] = useState<string>("communitySelected");
    const handlemodeChange=(catenum:number)=>{
        if (catenum === 1){
            handleClassNameChange("communitySelected");
        } else if (catenum === 2){
            handleClassNameChange("deliverySelected");
        } else if (catenum === 3){
            handleClassNameChange("groupBuyingSelected");
        }
        setMCcategory(catenum)
    }
    const handleClassNameChange=(category:string)=>{
        setcategoryClassName(category)
    }
    return (
        <div className='mycommunityOutLine'>
            <div className='applicationNav'>
                <div onClick={()=>{handlemodeChange(1)}}>나의 게시판</div>
                <div onClick={()=>{handlemodeChange(2)}}>나의 배달</div>
                <div onClick={()=>{handlemodeChange(3)}}>나의 공구</div>
                <div className={categoryClassName}></div>
            </div>
            {MCcategory === 1 && <MyCommunity/>}
            {MCcategory === 2 && <MyDelivery/>}
            {MCcategory === 3 && <MyGroupBuying/>}
        </div>
    );
}

export default MyCommunityRecord;
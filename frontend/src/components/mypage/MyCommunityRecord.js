import React, { useState } from 'react';
import MyCommunity from './MyCommunity/MyCommunity';
import MyDelivery from './MyCommunity/MyDelivery';
import MyGroupBuying from './MyCommunity/MyGroupBuying';
function MyCommunityRecord() {
    const [MCcategory, setMCcategory] = useState(1);
    const modeChange=(catenum)=>{
        setMCcategory(catenum)
    }
    return (
        <div>
            {MCcategory === 1 && <MyCommunity/>}
            {MCcategory === 2 && <MyDelivery/>}
            {MCcategory === 3 && <MyGroupBuying/>}
            <button onClick={()=>{modeChange(1)}}>나의 게시판</button>
            <button onClick={()=>{modeChange(2)}}>나의 배달</button>
            <button onClick={()=>{modeChange(3)}}>나의 공구</button>
        </div>
    );
}

export default MyCommunityRecord;
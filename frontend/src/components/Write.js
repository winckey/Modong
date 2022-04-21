import React, { useState } from 'react';
import CommunityWrite from './write/CommunityWrite';
import DeliveryWrite from './write/DeliveryWrite';
import GroupBuyingWrite from './write/GroupBuyingWrite';
function Write() {
  const [Wcategory, setWCategory]=useState(1);
  const ChangeWcategory =(catenum) =>{
    setWCategory(catenum);
  }
  return (
    <div>
        <p>Write</p>
        <button onClick={() =>{ChangeWcategory(1)}}>커뮤니티</button>
        <button onClick={() =>{ChangeWcategory(2)}}>배달</button>
        <button onClick={() =>{ChangeWcategory(3)}}>공구</button>
        {Wcategory === 1 && <CommunityWrite/>}
        {Wcategory === 2 && <DeliveryWrite/>}
        {Wcategory === 3 && <GroupBuyingWrite/>}
    </div>
  );
}

export default Write;
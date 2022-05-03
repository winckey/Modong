import React, { useState } from 'react';
import CommunityWrite from './write/CommunityWrite.tsx';
import DeliveryWrite from './write/DeliveryWrite.tsx';
import GroupBuyingWrite from './write/GroupBuyingWrite.tsx';

import '../style/_write.scss'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Write() {
  const [Wcategory, setWCategory]=useState<number>(1);
  const handleWcategory =(e:any) =>{
    setWCategory(e.target.value);
  }
  return (
    <div className='outLine'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">주제 선택</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="주제 선택"
            value={Wcategory||1}
            onChange={handleWcategory}
          >
            <MenuItem value={1}>게시판</MenuItem>
            <MenuItem value={2}>배달</MenuItem>
            <MenuItem value={3}>공통구매</MenuItem>
          </Select>
        </FormControl>
        {Wcategory == 1 && <CommunityWrite/>}
        {Wcategory == 2 && <DeliveryWrite/>}
        {Wcategory == 3 && <GroupBuyingWrite/>}
    </div>
  );
}

export default Write;
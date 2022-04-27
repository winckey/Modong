import React, { useState } from 'react';
import CommunityWrite from './write/CommunityWrite';
import DeliveryWrite from './write/DeliveryWrite';
import GroupBuyingWrite from './write/GroupBuyingWrite';

import '../style/_write.scss'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Write() {
  const [Wcategory, setWCategory]=useState(1);
  const handleWcategory =(e) =>{
    console.log(e.target.value)
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
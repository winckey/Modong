import React, { useState } from 'react';

import Delivery from './home/Delivery';
import GroupBuying from './home/GroupBuying';

function Home() {
  const [category, setCategory] = useState(1);

  const categoryChange = (catenum) =>{
    setCategory(catenum)
  }
  return (
    <>
      <button onClick={() =>{categoryChange(1)}}>배달</button>
      <button onClick={() =>{categoryChange(2)}}>공구</button>
      <div>
        {category === 1
        ? <Delivery/>
        : <GroupBuying/>}
      </div>
    </>
  );
}

export default Home;
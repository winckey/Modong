import React, { useState } from 'react';

import Delivery from './home/Delivery.tsx';
import GroupBuying from './home/GroupBuying.tsx';

import '../style/_home.scss'

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [category, setCategory] = useState<number>(1);

  const categoryChange = (catenum:number) =>{
    setCategory(catenum)
  }
  return (
    <>
      <div className='homeoutLine'>
        <div className='homeNav'>
          <div onClick={() =>{categoryChange(1)}}>배달</div>
          <div onClick={() =>{categoryChange(2)}}>공구</div>
          <div className={(category === 1 ? 'deliverySelected':'groupBuyingSelected')}></div>
        </div>
        <div>
          {category === 1
          ? <Delivery/>
          : <GroupBuying/>}
        </div>
        <Link to="/write" className="writemark"><FontAwesomeIcon icon={faPen}/></Link>
      </div>
    </>
  );
}

export default Home;
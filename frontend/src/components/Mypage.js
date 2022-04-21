import React from 'react';
import { Link } from 'react-router-dom';

function Mypage() {
   
  return (
    <div>
        <p>mypage</p><br/>
        <Link to='/profile'>profile</Link> /
        <Link to='/myapplication'>myapplication</Link> /
        <Link to='/mycommunityrecord'>mycommunityrecord</Link>
    </div>
  );
}

export default Mypage;
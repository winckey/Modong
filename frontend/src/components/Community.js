import React from 'react';
import { Link } from 'react-router-dom';

function Community() {
   
  return (
    <div>
        <p>Community</p>
        <Link to="/write">Write</Link>
        <Link to='/communitydetail'>communitydetail</Link>
    </div>
  );
}

export default Community;
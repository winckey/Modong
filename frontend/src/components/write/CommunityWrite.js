import React from 'react';
import { Link } from 'react-router-dom';

function CommunityWrite() {
    return (
        <div>
            <p>게시판 쓰기</p>
            <Link to="/community">Community</Link>
        </div>
    );
}

export default CommunityWrite;
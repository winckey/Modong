import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../style/_communityWrite.scss"

function CommunityWrite() {
    const [contents, setContnets] = useState("");
    const handleContentsChange =(e) =>{
        setContnets(e.target);
    }
    return (
        <div className='ccoutLine'>
            <textarea onChange={handleContentsChange}/>
            <Link to="/community" className='button'>생성하기</Link>
        </div>
    );
}

export default CommunityWrite;
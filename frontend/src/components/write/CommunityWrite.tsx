import  React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import "../../style/_communityWrite.scss"

function CommunityWrite() {
    const [contents, setContnets] = useState<string>("");
    const handleContentsChange =(e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setContnets(e.target.value);
    }
    return (
        <div className='ccoutLine'>
            <textarea onChange={handleContentsChange}/>
            <Link to="/community" className='button'>생성하기</Link>
        </div>
    );
}

export default CommunityWrite;
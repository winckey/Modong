import  React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../style/_communityWrite.scss"

import axios, {AxiosResponse, AxiosError} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import RootState from "../reducer/reducers.tsx"
import actionCreators from "../../actions/actionCreators.tsx"

function CommunityWrite() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [contents, setContnets] = useState<string>("");
    const handleContentsChange =(e:React.ChangeEvent<HTMLTextAreaElement>) =>{
        setContnets(e.target.value);
    }
    const userId = useSelector<number>((state:RootState) => {
        return state.accounts.data.user.id
      })
    const handlecreatecommunity = () => {
        if(contents === ""){
            alert("메시지를 입력해주세요")
        }else{
            axios.post('/board-service',
                {
                    description: contents,
                    id:0,
                    userId: userId
                },
                {
                    headers: {
                        "Content-type": "application/json",
                        Accept: "*/*",
                    },
                }
            )
            .then((response:AxiosResponse) => {
                dispatch(actionCreators.setFooterSelected(2));
                navigate("/community");
            })
            .catch((error:AxiosError) => {
                alert("오류입니다 관리자와 이야기해주세요")
            })
        }
      };
    return (
        <div className='ccoutLine'>
            <textarea onChange={handleContentsChange} value={contents||""}/>
            <div onClick={()=>{handlecreatecommunity()}} className='create'>생성하기</div>
        </div>
    );
}

export default CommunityWrite;
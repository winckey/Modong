import React, {useState, useEffect} from 'react';
import "../../../style/_myGroupBuying.scss"
import RequestedModal from '../../modal/GroupBuyingRequestedModal.tsx';
import CloseModal from '../../modal/_CloseModal.tsx'

import axios, {AxiosResponse, AxiosError} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';

import RootState from "../../../reducer/reducers.tsx"
import {reversedatetrans} from '../../../actions/TimeLapse.tsx'
const data = [{name:"갓김치 1KG", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"여수밤밥", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]

function MyGroupBuying() {
    const dispatch = useDispatch();
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })
    const [ myGroupBuyingList, setMyGroupBuyingList ] = useState([]);
    const [ modalOpen, setModalOpen] = React.useState(false);
    const [ closeModalOpen, setCloseModalOpen] = React.useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const openCloseModal = () => {
        setCloseModalOpen(true);
    }
    const closeCloseModal = () => {
        setCloseModalOpen(false);
    }
    const handlegetMyList = () => {
        axios.get(`/board-service/group-purchase/${userId}`)
            .then((response:AxiosResponse) => {
            console.log(response.data, "from 공구");
            setMyGroupBuyingList(response.data.content)
            })
            .catch((error:AxiosError) => {
            console.log(error, "에러");
            })
    };
    useEffect(()=>{
        handlegetMyList();
    },[])

    return (
        <div>
            <div className='myGroupBuyingInList'>
                {myGroupBuyingList.map((mgdata) =>(
                    <div className='shadow' key={mgdata.id}>
                        <div>{mgdata.productName}</div>
                        <div>{reversedatetrans(mgdata.closeTime)}남았습니다.</div>
                        <div>
                            <div onClick={()=>{openCloseModal()}}>마감하기</div>
                            <div onClick={()=>{openModal()}}>신청내역확인</div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <CloseModal open={closeModalOpen}  close={closeCloseModal} info={data}>
                </CloseModal>
            </div>

            <div>
                <RequestedModal open={modalOpen}  close={closeModal} info={data}>
                </RequestedModal>
            </div>

        </div>
    );
}

export default MyGroupBuying;
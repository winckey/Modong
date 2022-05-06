import React, {useState, useEffect} from 'react';

import '../../style/_groupBuying.scss'
import Modal from '../modal/GroupBuyingApplyModal.tsx'

import axios, {AxiosResponse, AxiosError} from "axios";

import {reversedatetrans} from '../../actions/TimeLapse.tsx'

const data = [{name:"오나라식탁", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"오나라2식탁", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]

function GroupBuying() {
    const [ modalOpen, setModalOpen] = useState(false);
    const [ groupBuyingList, setGroupBuyingList ] = useState([]);
    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
    setModalOpen(false);
    };
    const handlegetList = () => {
        axios.get(`/board-service/group-purchase`)
            .then((response:AxiosResponse) => {
            console.log(response.data, "from 공구");
            setGroupBuyingList(response.data.content)
            })
            .catch((error:AxiosError) => {
            console.log(error, "에러");
            })
    };
    useEffect(()=>{
        handlegetList();
    },[])
    return (
        <div>
            <div className='groupbuyinginList'>
                {groupBuyingList.map((data) =>(
                    <div className='shadow' key={data.id}>
                        <div>{data.productName}</div>
                        <div>{data.pickupLocation}</div>
                        <div>{reversedatetrans(data.closeTime)} 남았습니다.</div>
                        <div onClick={()=>{openModal()}}>신청하기</div>
                    </div>
                ))}
            </div>

            <div>
                <Modal open={modalOpen}  close={closeModal}  info={data}>
                </Modal>
            </div>

        </div>
    );
}

export default GroupBuying;
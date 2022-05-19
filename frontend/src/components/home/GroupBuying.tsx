import React, {useState, useEffect} from 'react';

import '../../style/_groupBuying.scss'
import Modal from '../modal/GroupBuyingApplyModal.tsx'
import { useSelector } from 'react-redux';
import axios, {AxiosResponse, AxiosError} from "axios";

import {reversedatetrans} from '../../actions/_TimeLapse.tsx'

import { gropupbuyingmodalpropstype } from "../../actions/_interfaces.tsx"

import RootState from "../../reducer/reducers.tsx"

function GroupBuying() {

    const [ modalOpen, setModalOpen] = useState<boolean>(false);
    const [ groupBuyingList, setGroupBuyingList ] = useState<gropupbuyingmodalpropstype[]>([]);
    const [ modalprops, setModalprops] = useState<gropupbuyingmodalpropstype>(); 

    const userId = useSelector<number>((state:RootState) => {
        return state.accounts.data.user.id
    })

    const openModal = (data:gropupbuyingmodalpropstype) => {
        if(data.userInfo.id !== userId){
            setModalOpen(true);
            setModalprops(data);
        }else{
            alert("자신의 게시글에는 예약 할 수 없습니다.")
        }
    };


    const closeModal = () => {
        setModalOpen(false);
    };



    const handlegetList = () => {
        axios.get(`/board-service/group-purchase/list/${userId}`)
            .then((response:AxiosResponse) => {
                console.log(response.data, "from 공구");
                setGroupBuyingList(response.data.content)
            })
            .catch((error:AxiosError) => {
                console.log(error, "에러");
                alert("오류입니다 관리자와 이야기 해주세요!")
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
                        <div onClick={()=>{openModal(data)}}>신청하기</div>
                    </div>
                ))}
            </div>

            <div>
                <Modal open={modalOpen}  close={closeModal}  info={modalprops} wideClose={setModalOpen}>
                </Modal>
            </div>

        </div>
    );
}

export default GroupBuying;
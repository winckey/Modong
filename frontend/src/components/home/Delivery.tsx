import React, {useEffect, useState} from 'react';

import '../../style/_delivery.scss'
import Modal from '../modal/DeliveryApplyModal.tsx'

import axios, {AxiosResponse, AxiosError} from "axios";

import {reversedatetrans} from '../../actions/_TimeLapse.tsx'

import { deliverytype } from '../../actions/_interfaces.tsx'

import { useSelector } from "react-redux";
import RootState from "../../reducer/reducers.tsx"

function Delivery() {
    const [ modalPropsData, setModalPropsData ] = useState<deliverytype>(null);
    const [ modalOpen, setModalOpen] = useState<boolean>(false);
    const [ deliveryList, setDeliveryList ] = useState<deliverytype[]>([]);
    const userId = useSelector<number>((state:RootState) => {
        return state.accounts.data.user.id
    })
    const openModal = (d:deliverytype) => {
        if(d.userInfo.id !== userId){
            if(new Date(d.closeTime) > new Date()){
                setModalPropsData(d)
                setModalOpen(true);
            }else{
                alert("주문 시간을 초과했습니다.")
            }
        }else{
            alert("자신의 게시글에는 예약 할 수 없습니다.")
        }
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const handlegetList = () => {
        axios.get(`/board-service/group-delivery/list/${userId}`)
        .then((response:AxiosResponse) => {
        console.log(response.data, "from qoekf");
        setDeliveryList(response.data.content)
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
            <div className='deliveryinList'>
                {deliveryList.map((data:deliverytype) =>(
                    <div className='shadow' key={data.id}>
                        <div>{data.storeName}</div>
                        <div>{data.pickupLocation}</div>
                        <div>{reversedatetrans(data.closeTime)} 남았습니다.</div>
                        <div onClick={()=>{openModal(data)}}>신청하기</div>
                        
                    </div>
                ))}
            </div>

            <div>
                <Modal open={modalOpen}  close={closeModal}  info={modalPropsData} wideClose={setModalOpen}>
                </Modal>
            </div>

        </div>
    );
}

export default Delivery;
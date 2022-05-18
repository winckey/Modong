import React, {useEffect, useState} from 'react';

import '../../style/_delivery.scss'
import Modal from '../modal/DeliveryApplyModal.tsx'

import axios, {AxiosResponse, AxiosError} from "axios";

import {reversedatetrans} from '../../actions/_TimeLapse.tsx'

import { deliverytype } from '../../actions/_interfaces.tsx'

function Delivery() {
    const [ modalPropsData, setModalPropsData ] = useState<deliverytype>(null);
    const [ modalOpen, setModalOpen] = useState<boolean>(false);
    const [ deliveryList, setDeliveryList ] = useState<deliverytype[]>([]);
    const openModal = (d:deliverytype) => {
        setModalPropsData(d)
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

    const handlegetList = () => {
    axios.get(`/board-service/group-delivery`)
        .then((response:AxiosResponse) => {
        console.log(response.data, "from qoekf");
        setDeliveryList(response.data.content)
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
import React, {useEffect, useState} from 'react';

import '../../style/_delivery.scss'
import Modal from '../modal/DeliveryApplyModal.tsx'

import axios, {AxiosResponse, AxiosError} from "axios";

import {reversedatetrans} from '../../actions/TimeLapse.tsx'

const data = [{name:"오나라식탁", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"오나라2식탁", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]
const addressList = ['서울특별시', '부산광역시', '대구광역시','인천광역시','광주광역시','대전광역시']

function Delivery() {
    
    const [ modalOpen, setModalOpen] = useState(false);
    const [ deliveryList, setDeliveryList ] = useState([]);
    const openModal = () => {
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
                {deliveryList.map((data, index) =>(
                    <div className='shadow' key={index}>
                        <div>{data.storeName}</div>
                        <div>{data.pickupLocation}</div>
                        <div>{reversedatetrans(data.closeTime)} 남았습니다.</div>
                        <div onClick={()=>{openModal()}}>신청하기</div>
                        
                    </div>
                ))}
            </div>

            <div>
                <Modal open={modalOpen}  close={closeModal}  info={addressList}>
                </Modal>
            </div>

        </div>
    );
}

export default Delivery;
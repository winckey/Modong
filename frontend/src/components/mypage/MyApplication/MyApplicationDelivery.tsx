import React, { useEffect, useState } from 'react';

import "../../../style/_myApplicationDelivery.scss"
import Modal from '../../modal/_ApplyHistoryModal2.tsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import axios, {AxiosResponse, AxiosError} from "axios";

import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';
import RootState from "../../../reducer/reducers.tsx"

import { groupBuyingRecordDataType } from "../../../actions/_interfaces"

function MyApplicationDelivery() {
    const [ myApplicationDeliveryData, setMyApplicationDeliveryData ] = useState<groupBuyingRecordDataType[]>([]); 
    const [ modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [ propsModalData, setPropsModalData] = useState<groupBuyingRecordDataType>(null);
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })
    const getapplicationdata = () =>{
        console.log(`/order-service/user/${userId}/ORDER_DELIVERY`);
        axios.get(`/order-service/user/${userId}/ORDER_DELIVERY`)
        .then((response:AxiosResponse) => {
        console.log(response, "채팅 데이터 가져오기");
        setMyApplicationDeliveryData(response.data)
        })
        .catch((error:AxiosError) => {
        console.log(error, "에러");
        })
    }
    useEffect(()=>{
        getapplicationdata()
    },[])
    const openModal = (d:groupBuyingRecordDataType) => {
        setModalOpen(true);
        setPropsModalData(d);
    };
    const closeModal = () => {
        setModalOpen(false);
        setPropsModalData(null);
    };

    return (
        <div>
            <div className='outBox'>
                {myApplicationDeliveryData.map((d:groupBuyingRecordDataType, index:number)=>(
                    <div className='madeliverycard' key={index}>
                        <div>
                            <div>{d.boardDto.storeName}</div>
                            <div onClick={()=>{openModal(d)}}>
                                <FontAwesomeIcon icon={faFile} /> 내역보기
                            </div>
                        </div>
                        <div>
                            <div>수령지</div>
                            <div>{d.boardDto.pickupLocation}</div>
                        </div>
                    </div>
                ))}            
            </div>
            
            <div>
                <Modal open={modalOpen}  close={closeModal} info={propsModalData}>
                </Modal>
            </div>
            
        </div>
    );
}

export default MyApplicationDelivery;
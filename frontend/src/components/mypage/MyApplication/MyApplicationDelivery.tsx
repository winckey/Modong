import React, { useEffect, useState } from 'react';

import "../../../style/_myApplicationDelivery.scss"
import Modal from '../../modal/_ApplyHistoryModal2.tsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import axios, {AxiosResponse, AxiosError} from "axios";

import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';
import RootState from "../../../reducer/reducers.tsx"

const data = [{title:"갓김치1", arrive:"우리집1222222222222222222222222222222222"}, {title:"갓김치2", arrive:"우리집23333333333333333333333333333333"}, {title:"갓김치3", arrive:"우리집 이층 삼층 사층 오층 1"}]

function MyApplicationDelivery() {
    const [ myApplicationDeliveryData, setMyApplicationDeliveryData ] = useState([]); 
    const [ modalOpen, setModalOpen] = React.useState(false);
    const [ propsModalData, setPropsModalData] = useState(null);
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })
    const getapplicationdata = () =>{
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
    const openModal = (d:any) => {
        setModalOpen(true);
        setPropsModalData(d);
    };
    const closeModal = () => {
        setModalOpen(false);
        setPropsModalData(null);
    };

    return (
        <div>
            <div>
                {myApplicationDeliveryData.map((d)=>(
                    <div className='madeliverycard'>
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
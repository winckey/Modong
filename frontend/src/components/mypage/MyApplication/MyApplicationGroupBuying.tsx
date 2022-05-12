import React, { useEffect, useState } from 'react';

import "../../../style/_myApplicationDelivery.scss"
import Modal from '../../modal/_ApplyHistoryModal.tsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import axios, {AxiosResponse, AxiosError} from "axios";

import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';
import RootState from "../../../reducer/reducers.tsx"

function MyApplicationGroupBuying() {
    const [ myApplicationGroupBuyingData, setMyApplicationGroupBuyingData ] = useState([]);
    const [ propsModalData, setPropsModalData] = useState(null);
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })
    const getapplicationdata = () =>{
        console.log(1111111111, userId)
        axios.get(`/order-service/user/${userId}/ORDER_GROUP`)
        .then((response:AxiosResponse) => {
        console.log(response.data, "공구 데이터 가져오기");
        setMyApplicationGroupBuyingData(response.data)
        })
        .catch((error:AxiosError) => {
        console.log(error, "에러");
        })
    }
    useEffect(()=>{
        getapplicationdata()
    },[])
    const [ modalOpen, setModalOpen] = React.useState(false);
    const openModal = (d:any) => {
        setModalOpen(true);
        setPropsModalData(d)
    };
    const closeModal = () => {
        setPropsModalData(null);
        setModalOpen(false);
    };

    return (
        <div>
            <div>
                {myApplicationGroupBuyingData.map((data, index)=>(
                    <div key={index} className='madeliverycard'>
                        <div>
                            <div>{data.boardDto.productName}</div>
                            <div onClick={()=>{openModal(data)}}>
                                <FontAwesomeIcon icon={faFile} /> 내역보기
                            </div>
                        </div>
                        <div>
                            <div>수령지</div>
                            <div>{data.boardDto.pickupLocation}</div>
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

export default MyApplicationGroupBuying;
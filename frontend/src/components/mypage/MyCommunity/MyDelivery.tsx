import React, {useState, useEffect} from 'react';
import "../../../style/_myGroupBuying.scss"
import RequestedModal from '../../modal/DeliveryRequestedModal.tsx';
import CloseModal from '../../modal/_CloseModal.tsx'

import axios, {AxiosResponse, AxiosError} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';

import RootState from "../../../reducer/reducers.tsx"
import {reversedatetrans} from '../../../actions/TimeLapse.tsx'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { deliverytype } from "../../actions/_interfaces.tsx";

function MyDelivery() {
    const dispatch = useDispatch();
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })
    const [ myDeliveryList, setMyDeliveryList ] = useState<deliverytype[]>([]);
    const [ modalOpen, setModalOpen] = React.useState(false);
    const [ closeModalOpen, setCloseModalOpen] = React.useState(false);
    const [ modalPropsData, setModalPropsData] = React.useState<deliverytype>(null);

    const openModal = (data:deliverytype) => {
        setModalOpen(true);
        setModalPropsData(data);
        console.log(data);
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
    const handleDelCommunity = (myCommunityId:number) =>{
        alert("삭제하시겠습니까?")
        axios.delete(`/board-service/group-delivery`,{data:{id:myCommunityId}})
        .then((response:AxiosResponse) => {
            console.log(response.data, "나의 배달 나가기")
        })
        .catch((error:AxiosError) => {
            console.log(error, "에러");
        })
    }

    const getMyDeliveryList=()=>{
        axios.get(`/board-service/group-delivery/${userId}`)
        .then((response:AxiosResponse) => {
            console.log(response.data, "from qoekf");
            setMyDeliveryList(response.data.content)
            })
            .catch((error:AxiosError) => {
            console.log(error, "에러");
            })
    }
    useEffect(()=>{
        getMyDeliveryList();
    },[]);

    const handleFinish = () => {

    };
    return (
        <div>
            <div className='myGroupBuyingInList'>
                {myDeliveryList.map((mddata) =>(
                    <div className='shadow' key={mddata.id}>
                        <div>{mddata.storeName}</div>
                        <div>{reversedatetrans(mddata.closeTime)}남았습니다.</div>
                        <div>
                            <div onClick={()=>{openCloseModal()}}>마감하기</div>
                            <div onClick={()=>{openModal(mddata)}}>신청내역확인</div>
                        </div>
                        <FontAwesomeIcon onClick={()=>{handleDelCommunity(mddata.id)}} className='rightExitIcon' icon={faRightToBracket}/>
                    </div>
                ))}
            </div>

            <div>
                <CloseModal open={closeModalOpen}  close={closeCloseModal} info={modalPropsData} finish={handleFinish}>
                </CloseModal>
            </div>

            <div>
                <RequestedModal open={modalOpen}  close={closeModal} info={modalPropsData}>
                </RequestedModal>
            </div>

        </div>
    );
}

export default MyDelivery;
import React, {useState, useEffect} from 'react';
import "../../../style/_myGroupBuying.scss"
import RequestedModal from '../../modal/GroupBuyingRequestedModal.tsx';
import CloseModal from '../../modal/_CloseModal.tsx'

import axios, {AxiosResponse, AxiosError} from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import actionCreators from '../../../actions/actionCreators.tsx';

import RootState from "../../../reducer/reducers.tsx"
import {reversedatetrans} from '../../../actions/TimeLapse.tsx'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

import { groupbuyingtype } from "../../actions/_interfaces.tsx";

function MyGroupBuying() {
    const dispatch = useDispatch();
    const userId = useSelector((state:RootState) =>{
        return state.accounts.data.user.id
    })
    const [ myGroupBuyingList, setMyGroupBuyingList ] = useState<groupbuyingtype[]>([]);
    const [ modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [ closeModalOpen, setCloseModalOpen] = React.useState<boolean>(false);
    const [ modalPropsData, setModalPropsData] = React.useState<groupbuyingtype>(null);

    const openModal = (data:groupbuyingtype) => {
        console.log("공구 정보!", data);
        setModalOpen(true);
        setModalPropsData(data);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const openCloseModal = (data:groupbuyingtype) => {
        setModalPropsData(data);
        console.log("공구 정보", data);
        setCloseModalOpen(true);
    }
    const closeCloseModal = () => {
        setCloseModalOpen(false);
    }
    const handleDelCommunity = (myCommunityId:number) =>{
        alert("삭제하시겠습니까?")
        axios.delete(`/board-service/group-purchase`,{data:{id:myCommunityId}})
        .then((response:AxiosResponse) => {
            console.log(response.data, "나의 공구 나가기")
        })
        .catch((error:AxiosError) => {
            console.log(error, "에러");
        })
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


    const handleFinish = () => {

    };

    return (
        <div>
            <div className='myGroupBuyingInList'>
                {myGroupBuyingList.map((mgdata) =>(
                    <div className='shadow' key={mgdata.id}>
                        <div>{mgdata.productName}</div>
                        <div>{reversedatetrans(mgdata.closeTime)}남았습니다.</div>
                        <div>
                            <div onClick={()=>{openCloseModal(mgdata)}}>마감하기</div>
                            <div onClick={()=>{openModal(mgdata)}}>신청내역확인</div>
                        </div>
                        <FontAwesomeIcon onClick={()=>{handleDelCommunity(mgdata.id)}} className='rightExitIcon' icon={faRightToBracket}/>
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

export default MyGroupBuying;
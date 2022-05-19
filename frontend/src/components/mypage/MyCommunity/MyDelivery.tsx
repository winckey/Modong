import React, {useState, useEffect} from 'react';
import "../../../style/_myGroupBuying.scss"
import RequestedModal from '../../modal/DeliveryRequestedModal.tsx';
import CloseModal from '../../modal/_CloseModal.tsx'
import ExitModal from '../../modal/_ExitModal.tsx'

import axios, {AxiosResponse, AxiosError} from 'axios';
import { useSelector } from 'react-redux';

import RootState from "../../../reducer/reducers.tsx"
import {reversedatetrans} from '../../../actions/_TimeLapse.tsx'

import { deliverytype } from "../../../actions/_interfaces.tsx";

function MyDelivery() {
    const user = useSelector((state:RootState) =>{
        return state.accounts.data.user
    })

    const [ myDeliveryList, setMyDeliveryList ] = useState<deliverytype[]>([]);
    const [ modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [ closeModalOpen, setCloseModalOpen] = React.useState<boolean>(false);
    const [ exitModalOpen, setExitModalOpen] = React.useState<boolean>(false);
    const [ modalPropsData, setModalPropsData] = React.useState<deliverytype>(null);

    const openModal = (data:deliverytype) => {
        setModalOpen(true);
        setModalPropsData(data);
        console.log(data);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openCloseModal = (data:deliverytype) => {
        setCloseModalOpen(true);
        setModalPropsData(data);
        console.log(data);
    }

    const closeCloseModal = () => {
        setCloseModalOpen(false);
    }

    const closeExitModal = () => {
        setExitModalOpen(false);
    }


    const handleDelCommunity = (myCommunityId:number) =>{
        axios.delete(`/board-service/group-delivery`,{data:{id:myCommunityId}})
        .then((response:AxiosResponse) => {
            console.log(response.data, "나의 배달 나가기")
        })
        .catch((error:AxiosError) => {
            console.log(error, "배달 나가기 에러");
            alert("오류입니다 관리자와 이야기 해주세요!")
        })
    }

    const getMyDeliveryList=()=>{
        axios.get(`/board-service/group-delivery/${user.id}`)
        .then((response:AxiosResponse) => {
            console.log(response.data, "배달리스트");
            setMyDeliveryList(response.data.content)
            })
            .catch((error:AxiosError) => {
            console.log(error, "배달리스트에러");
            })
    }
    useEffect(()=>{
        getMyDeliveryList();
    },[]);

    const handleFinish = (data:any) => {
        console.log(data, "Data")
        const deldata = {
            data: {
                closeTime: data.closeTime,
                id: data.id,
                pickupLocation: data.pickupLocation,
                storeName: data.storeName,
                url: data.url,
                userId: user.id
            }
        }
        axios.delete('/board-service/group-delivery',deldata
        ).then((res)=>{
            console.log("배달마감성공",res);
        }).catch((err)=>{
            console.log("배달마감실패",err);
            alert("오류입니다 관리자와 이야기 해주세요!")
        })
    };

    return (
        <div>
            <div className='myGroupBuyingInList'>
                {myDeliveryList.map((mddata:deliverytype) =>(
                    <div className='shadow' key={mddata.id}>
                        <div>{mddata.storeName}</div>
                        {reversedatetrans(mddata.closeTime)==="종료되었습니다." ?(
                        <div>종료되었습니다.</div>
                        ):(
                        <div>{reversedatetrans(mddata.closeTime)}남았습니다.</div>
                        )}
                        <div className='myGroupCardTwoBtn'>
                            {reversedatetrans(mddata.closeTime)==="종료되었습니다." ? (<div onClick={()=>{openCloseModal(mddata)}}>톡만들기</div>):(<div onClick={()=>{openCloseModal(mddata)}}>마감하기</div>)}
                            <div onClick={()=>{openModal(mddata)}}>신청내역확인</div>
                        </div>
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
            <div>
                <ExitModal open={exitModalOpen}  close={closeExitModal} info={modalPropsData} finish={handleDelCommunity}>
                </ExitModal>
            </div>
        </div>
    );
}

export default MyDelivery;
import React from 'react';
import "../../../style/_myGroupBuying.scss"
import RequestedModal from '../../modal/GroupBuyingRequestedModal.tsx';
import CloseModal from '../../modal/_CloseModal.tsx'
const data = [{name:"갓김치 1KG", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"여수밤밥", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]

function MyGroupBuying() {

    const [ modalOpen, setModalOpen] = React.useState(false);
    const [ closeModalOpen, setCloseModalOpen] = React.useState(false);

    const openModal = () => {
        setModalOpen(true);
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

    return (
        <div>
            <div className='myGroupBuyingInList'>
                {data.map((d, index) =>(
                    <div className='shadow' key={index}>
                        <div>{d.name}</div>
                        <div>{d.lefttime}분 남았습니다.</div>
                        <div>
                            <div onClick={()=>{openCloseModal()}}>마감하기</div>
                            <div onClick={()=>{openModal()}}>신청내역확인</div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <CloseModal open={closeModalOpen}  close={closeCloseModal} info={data}>
                </CloseModal>
            </div>

            <div>
                <RequestedModal open={modalOpen}  close={closeModal} info={data}>
                </RequestedModal>
            </div>

        </div>
    );
}

export default MyGroupBuying;
import React, {useState} from 'react';

import '../../style/_groupBuying.scss'
import Modal from '../modal/GroupBuyingApplyModal.tsx'

const data = [{name:"갓김치 1KG", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"여수밤밥", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]
function GroupBuying() {
    const [ modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

    return (
        <div>
            <div className='inList'>
                {data.map((d, index) =>(
                    <div className='shadow' key={index}>
                        <div>{d.name}</div>
                        <div>{d.arrivepoint}</div>
                        <div>{d.lefttime}분 남았습니다.</div>
                        <div onClick={()=>{openModal()}}>신청하기</div>
                    </div>
                ))}
            </div>

            <div>
                <Modal open={modalOpen}  close={closeModal}  info={data}>
                </Modal>
            </div>

        </div>
    );
}

export default GroupBuying;
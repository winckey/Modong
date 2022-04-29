import React, {useState} from 'react';

import '../../style/_delivery.scss'
import Modal from '../modal/DeliveryApplyModal.tsx'
// import Modal from '../modal/GroupBuyingApplyModal.tsx'


const data = [{name:"오나라식탁", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"오나라2식탁", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]
const addressList = ['서울특별시', '부산광역시', '대구광역시','인천광역시','광주광역시','대전광역시']

function Delivery() {
    
    const [ modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };
      const closeModal = () => {
        setModalOpen(false);
      };

   
    return (
        <div>
            <div className='deliveryinList'>
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
                <Modal open={modalOpen}  close={closeModal}  info={addressList}>
                </Modal>
            </div>

        </div>
    );
}

export default Delivery;
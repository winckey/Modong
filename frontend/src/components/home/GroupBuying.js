import React from 'react';

import '../../style/_groupBuying.scss'

const data = [{name:"갓김치 1KG", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"여수밤밥", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]
function GroupBuying() {
    const handleModalOpen = (data) =>{
        alert(data)
    }
    return (
        <div className='inList'>
            {data.map((d, index) =>(
                <div key={index}>
                    <div>{d.name}</div>
                    <div>{d.arrivepoint}</div>
                    <div>{d.lefttime}분 남았습니다.</div>
                    <div onClick={()=>{handleModalOpen(data)}}>신청하기</div>
                </div>
            ))}
        </div>
    );
}

export default GroupBuying;
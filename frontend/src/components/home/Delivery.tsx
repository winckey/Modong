import React from 'react';

import '../../style/_delivery.scss'

const data = [{name:"오나라식탁", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"오나라2식탁", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]

function delivery() {
    const handleModalOpen = (data:any) =>{
        alert(data)
    }
    return (
        <div className='inList'>
            {data.map((d, index) =>(
                <div className='shadow' key={index}>
                    <div>{d.name}</div>
                    <div>{d.arrivepoint}</div>
                    <div>{d.lefttime}분 남았습니다.</div>
                    <div onClick={()=>{handleModalOpen(d)}}>신청하기</div>
                </div>
            ))}
        </div>
    );
}

export default delivery;
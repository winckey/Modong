import React from 'react';
import "../../../style/_myCommunity.scss"
const data = [{name:"갓김치 1KG", arrivepoint:"sk뷰 아파트 106동 1101호", lefttime:10}, {name:"여수밤밥", arrivepoint:"sk뷰 아파트 106동 1102호", lefttime:20}]

function MyCommunity() {
    const handleModalOpen = (data:any) =>{
        alert(data)
    }
    return (
        <div className='myCommunity'>
            {data.map((d, index) =>(
                <div className='shadow' key={index}>
                    <div>{d.name}</div>
                    <div>{d.lefttime}분 남았습니다.</div>
                    <div>
                        <div onClick={()=>{handleModalOpen(data)}}>상세보기</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyCommunity;
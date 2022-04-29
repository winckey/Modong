import React from 'react';

import "../../../style/_myApplicationDelivery.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";


const data = [{title:"갓김치1", arrive:"우리집1222222222222222222222222222222222"}, {title:"갓김치2", arrive:"우리집23333333333333333333333333333333"}, {title:"갓김치3", arrive:"우리집 이층 삼층 사층 오층 1"}]

function MyApplicationDelivery() {
    return (
        <div>
            {data.map((d, index)=>(
                <div className='madeliverycard'>
                    <div>
                        <div>{d.title}</div>
                        <div>
                            <FontAwesomeIcon icon={faFile}/>
                            내역보기
                        </div>
                    </div>
                    <div>
                        <div>수령지</div>
                        <div>{d.arrive}</div>
                    </div>
                    <div></div>
                </div>
            ))}
        </div>
    );
}

export default MyApplicationDelivery;
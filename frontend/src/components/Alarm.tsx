import React from 'react';
import "../style/_alarm.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


const data =[{ contents:"제목1"}, { contents:"제목2"}, { contents:"제목3"},{ contents:"제목1"}, { contents:"제목2"}, { contents:"제목3"},{ contents:"제목1"}, { contents:"제목2"}, { contents:"제목3"},{ contents:"제목1"}, { contents:"제목2"}, { contents:"제목3"}]
function Alarm() {
  return (
    <div className='alarmOutLine'>
        <div>
        {data.map((d, index)=>(
            <div key={index}>
                <div>{d.contents}</div>
                <div>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </div>
        ))}
        </div>
      <p>전체 삭제</p>
    </div>
  );
}

export default Alarm;
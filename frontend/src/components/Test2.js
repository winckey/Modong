import React from 'react';

import actionCreators from '../actions/actionCreators';
import { useDispatch } from "react-redux";

function Test1() {
    const dispatch = useDispatch();
    const setindex = () => {
        dispatch(actionCreators.setIndex1(2));
    }
  return (
    <div>
        <button onClick={setindex}>버튼</button>
    </div>
  );
}

export default Test1;
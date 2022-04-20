import React from 'react';
import actionCreators from '../actions/actionCreators';
import { useSelector , useDispatch } from "react-redux";

function Test1() {
    const { index1 } = useSelector(state => ({
        index1 : state.test.data.index1
    }))
    const dispatch = useDispatch();
    const setindex = () => {
        dispatch(actionCreators.setIndex1(1));
    }
  return (
    <div>
        <p>
        /{index1}/
        </p>
        <button onClick={setindex}>버튼1</button>
    </div>
  );
}

export default Test1;

// action type
const SET_INDEX1 = "setIndex1";

// action method
const setIndex1 = (index1) => {
    return {
        type : SET_INDEX1,
        index1 : index1,
    }
};

export const actionCreators = {
    setIndex1
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;
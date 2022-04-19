const test = (state = {
    data : {
        index1 : 1,
    }
}, action) => {
    switch (action.type) {
        case "setIndex1":
            return {
                ...state,
                data : {
                    ...state.data,
                    index1: action.index1
                }
            }
        default:
            return state;
    };
    
}

export default test;
const ischeck = (state = {
    data : {
        index1 : 1,
        isLogin : false,
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
        case "setIsLogin":
            return {
                ...state,
                data : {
                    ...state.data,
                    isLogin: action.isLogin
                }
            }
        default:
            return state;
    };
    
}

export default ischeck;
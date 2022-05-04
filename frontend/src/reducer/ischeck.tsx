const ischeck = (state = {
    data : {
        isLogin : false,
        footerSelected : 1,
    }
}, action:any) => {
    switch (action.type) {
        case "setIsLogin":
            return {
                ...state,
                data : {
                    ...state.data,
                    isLogin: action.isLogin
                }
            }
        case "setFooterSelected":
            return {
                ...state,
                data : {
                    ...state.data,
                    footerSelected: action.footerSelected
                }
            }
        default:
            return state;
    };
    
}

export default ischeck;
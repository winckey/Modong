const accounts = (state = {
    data: {
        user: {},
        token: null,
        refreshToken: null
    }
}, action:any) => {
    switch(action.type) {
        case "setUser": 
            return {
                ...state,
                data: {
                    ...state.data,
                    user: action.user
                }
        }
        

        case "setToken":
            return {
                ...state,
                data: {
                    ...state.data,
                    token: action.token
                }
            }


        case "setRefreshToken":
            return {
                ...state,
                data: {
                    ...state.data,
                    token: action.refreshToken
                }
            }
        

        default:
            return state;
    }
    
}       


export default accounts;
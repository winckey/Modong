const accounts = (state = {
    data: {
        user: {},
        token: null,
        refreshToken: null,
        fcmToken: null
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
                    refreshToken: action.refreshToken
                }
            }

        case "setFcmToken":
            return {
                ...state,
                data: {
                    ...state.data,
                    fcmToken: action.fcmToken
                }
            }
        

        default:
            return state;
    }
    
}       


export default accounts;
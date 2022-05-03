const address = (state = {
    data: {
        sigu: null,
        city: null,
        dong: null,
        dongCode: null
    }
}, action: any) => {
    switch (action.type) {
        case "setSigu": 
            return {
                ...state,
                data: {
                    ...state.data,
                    sigu: action.sigu
                }

            }
        
        case "setCity":
            return {
                ...state,
                data: {
                    ...state.data,
                    city: action.city
                }

            }
        
        case "setDong":
            return {
                ...state,
                data: {
                    ...state.data,
                    dong: action.dong
                }

            }

        case "setDongCode":
            return {
                ...state,
                data: {
                    ...state.data,
                    dongCode: action.dongCode
                }
            }

        default:
            return state;
    }
}

export default address;
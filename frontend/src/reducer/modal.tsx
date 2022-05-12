const modal = (state = {
    data: {
        groupBuyingModal: false
    }
}, action: any) => {
    switch(action.type) {
        case "setGroupBuyingModal":
            return {
                ...state,
                data: {
                    ...state.data,
                    groupBuyingModal: action.groupBuyingModal
                }
            }
        default:
            return state;
    }   
}

export default modal;
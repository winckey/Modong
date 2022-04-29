const propsData = (state = {
    data : {
        communityPropsData : {
            commucontents:"23",
            commutiem:0,
            commutag:[""],
            repnum:0
        }
    }
}, action:any) => {
    switch (action.type) {
        case "setCommunityPropsData":
            return {
                ...state,
                data : {
                    ...state.data,
                    communityPropsData: action.communityPropsData
                }
            }
        default:
            return state;
    };
    
}

export default propsData;
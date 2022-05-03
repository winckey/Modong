const propsData = (state = {
    data : {
        communityPropsData : {
            id: null,
            description: null,
            userId: null,
            createdDate: null,
            modifiedDate: null
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
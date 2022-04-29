// action type
const SET_INDEX1 = "setIndex1";
const SET_ISLOGIN = "setIsLogin";
const SET_FOOTERSELECTED = "setFooterSelected"
const SET_COMMUNITYPROPSDATA = "setCommunityPropsData"

// action method
const setIndex1 = (index1:any) => {
    return {
        type : SET_INDEX1,
        index1 : index1,
    }
};
const setIsLogin = (isLogin:number) => {
    return {
        type : SET_ISLOGIN,
        isLogin : isLogin,
    }
};
const setFooterSelected = (footerSelected:number) => {
    return {
        type : SET_FOOTERSELECTED,
        footerSelected : footerSelected,
    }
};

const setCommunityPropsData = (communityPropsData:number) => {
    return {
        type : SET_COMMUNITYPROPSDATA,
        communityPropsData : communityPropsData,
    }
};

export const actionCreators = {
    setIndex1,
    setIsLogin,
    setFooterSelected,
    setCommunityPropsData,
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;
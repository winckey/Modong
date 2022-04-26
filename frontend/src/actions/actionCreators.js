// action type
const SET_INDEX1 = "setIndex1";
const SET_ISLOGIN = "setIsLogin";
const SET_FOOTERSELECTED = "setFooterSelected"

// action method
const setIndex1 = (index1) => {
    return {
        type : SET_INDEX1,
        index1 : index1,
    }
};
const setIsLogin = (isLogin) => {
    return {
        type : SET_ISLOGIN,
        isLogin : isLogin,
    }
};
const setFooterSelected = (footerSelected) => {
    return {
        type : SET_FOOTERSELECTED,
        footerSelected : footerSelected,
    }
};

export const actionCreators = {
    setIndex1,
    setIsLogin,
    setFooterSelected,
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;
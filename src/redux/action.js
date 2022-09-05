import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from "./action-type";
import { reqLogin } from "../api";
import memoryUtils from "../utils/memoryUtils";
import { message } from "antd";
/* 设置头部标题的同步action */

export const setHeadTitle = (headTitle) => ({
    type: SET_HEAD_TITLE,
    data: headTitle,
});


export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const showErrorMsg = (errorMsg) => ({
    type: SHOW_ERROR_MSG,
    errorMsg
});

// export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg });

export const logout = () => {
    memoryUtils.removeUser();
    return { 
        type: RESET_USER
    };
};

/* 退出登陆的同步action */

/*  
登陆的异步 action
*/

export const login = (username, password) => async (dispatch) => {
    // 异步请求
    const result = (await reqLogin(username,password)).data;
    // console.log("action.js: result", result);
    if (result.status === 0) {
        // 成功，分发成功的dispatch
        const user = result.data;
        memoryUtils.saveUser(user);
        message.success('登录成功')
        dispatch(receiveUser(user));

    } else{
        // 失败，分发成功的dispatch，弹出失败消息
        const msg = result.msg;
        dispatch(showErrorMsg(msg))
        message.error(msg);

    }
};



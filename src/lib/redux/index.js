// 自定义的redux的主入口
// redux 库向外暴露下面几个函数
// createStore(): 接收的参数为 reducer 函数, 返回为 store 对象
// combineReducers(): 接收包含 n 个 reducer 方法的对象, 返回一个新的reducer 
// 函数applyMiddleware() // 暂不实现

// 2) store 对象的内部结构
// getState(): 返回值为内部保存的 state 数据
// dispatch(): 参数为 action 对象
// subscribe(): 参数为监听内部 state 更新的回调函数

export default createStore(reducer) {



    function getState() {

    }

    function dispatch(action) {
        
    }

    function subscribe(listener) {
        
    }


    return {
        getState,
        dispatch,
        subscribe
    }
}

export default combineReducers(reducers) {

    return (state, action) => {
        
    }

}



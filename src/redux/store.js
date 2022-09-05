// 储存state的仓库
import { applyMiddleware, createStore } from "redux";
import reducers from './reducer';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension'



const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
export default store
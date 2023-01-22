import { combineReducers } from "redux";
import userData from "./userReducer";
import notificationData from "./notificationReducer";
import busyIndicatorData from "./busyIndicatorReducer";
import queryData from "./queryReducer";

const appReducers = combineReducers({
	userData,
	notificationData,
	busyIndicatorData,
	queryData
});

export default appReducers;

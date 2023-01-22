import { combineReducers } from 'redux';
import userData from './userReducer';
import notificationData from './notificationReducer';
import busyIndicatorData from './busyIndicatorReducer';

const appReducers = combineReducers({
    userData,
    notificationData,
    busyIndicatorData
});

export default appReducers;
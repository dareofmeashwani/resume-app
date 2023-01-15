import { combineReducers } from 'redux';
import userData from './user_reducer';
import notificationData from './notification_reducer';

const appReducers = combineReducers({
    userData,
    notificationData
});

export default appReducers;
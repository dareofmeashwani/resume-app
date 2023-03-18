import {
  MEETINGS_LIST,
  MEETINGS_STATUS_LIST,
  MEETINGS_STATUS_LIST_CLEAR,
  MEETINGS_LIST_CLEAR
} from "../types";


export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case MEETINGS_LIST:
      return {...state, meetingsList: action.payload.docs};
    case MEETINGS_LIST_CLEAR:
      return {...state, meetingsList: null};
    case MEETINGS_STATUS_LIST:
      return { ...state, meetingsStatusList: [...action.payload.docs] };
    case MEETINGS_STATUS_LIST_CLEAR:
      return { ...state, meetingsStatusList: null };
    default:
      return state;
  }
}

import {
  MEETINGS_LIST,
  MEETINGS_LIST_CLEAR
} from "../types";


export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case MEETINGS_LIST:
      return {...state, meetingsList: action.payload.docs};
    case MEETINGS_LIST_CLEAR:
      return {...state, meetingsList: null};
    default:
      return state;
  }
}

import {userActionTypes} from './user.types';

import { IUserState } from "./userState";

const INITIAL_STATE: IUserState = {
    user: null,
    userDisplayName: null,
    userImage: null,
    error: null
}

const userReducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
    switch (action.type) {
      case userActionTypes.AUTH_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: null
        };
      case userActionTypes.SET_USER:
        return {
          ...state,
          user: action.payload
        };
      case userActionTypes.SET_USER_DISPLAY_NAME:
        return {
          ...state,
          userDisplayName: action.payload
        };
      case userActionTypes.SET_USER_IMAGE:
        return {
          ...state,
          userImage: action.payload
        };
      case userActionTypes.LOGOUT:
        return {
          ...state,
          user: null,
          error: null
        };
      case userActionTypes.AUTH_FAILURE:
        return {
          ...state,
          error: action.payload
      };
      case userActionTypes.RESET_ERROR:
        return {
          ...state,
          error: null
      };
      default:
        return state;
    }
  }
  
  export default userReducer;
import { userActionTypes } from './user.types';
import { IUserFormValues, IUser } from '../../models/user';

export const loginStart = (values: IUserFormValues) => ({
  type: userActionTypes.LOGIN_START,
  payload: values
});

export const registerStart = (values: IUserFormValues) => ({
  type: userActionTypes.REGISTER_START,
  payload: values
});

export const authSuccess = (user: IUser) => ({
  type: userActionTypes.AUTH_SUCCESS,
  payload: user
});

export const setUser = (user: IUser) => ({
  type: userActionTypes.SET_USER,
  payload: user
});

export const setUserDisplayName = (name: string) => ({
  type: userActionTypes.SET_USER_DISPLAY_NAME,
  payload: name
});

export const authFailure = (error: string) => ({
  type: userActionTypes.AUTH_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION
});

export const logoutOutStart = () => ({
  type: userActionTypes.LOGOUT_START
});

export const executeLogout = () => ({
  type: userActionTypes.LOGOUT
});

export const setUserImage = (photoUrl: string) => ({
  type: userActionTypes.SET_USER_IMAGE,
  payload: photoUrl
});

export const resetError = () => ({
  type: userActionTypes.RESET_ERROR
});

export const updateUser = () => ({
  type: userActionTypes.UPDATE_USER
});


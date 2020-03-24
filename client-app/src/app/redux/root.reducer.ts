import { combineReducers } from 'redux';
import { IModalState } from './modal/modalState';
import { IActivitiesState } from './activities/activitiesState';
import { IUserState } from './user/userState';
import { IProfileState } from './profile/profileState';
import modalReducer from './modal/modal.reducer';
import userReducer from './user/user.reducer';
import activitiesReducer from './activities/activities.reducer';
import profileReducer from './profile/profile.reducer';

export interface IApplicationState {
  modal: IModalState;
  user: IUserState;
  activities: IActivitiesState;
  profile: IProfileState;
}

const rootReducer = combineReducers<IApplicationState>({
  modal: modalReducer,
  user: userReducer,
  activities: activitiesReducer,
  profile: profileReducer
});

export default rootReducer;
import { createSelector } from 'reselect';
import { IApplicationState } from '../root.reducer';

export const selectUser = (state: IApplicationState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.user
);

export const selectCurrentUserDisplayName = createSelector(
  [selectUser],
  (user) => user.userDisplayName
);

export const selectCurrentUserImage = createSelector(
  [selectUser],
  (user) => user.userImage
);

export const authError = createSelector(
  [selectUser],
  (user) => user.error
);
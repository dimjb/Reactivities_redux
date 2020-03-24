import { createSelector } from 'reselect';
import { IApplicationState } from '../root.reducer';

const selectProfileState = (state: IApplicationState) => state.profile;

export const selectProfile = createSelector(
    [selectProfileState],
    (profile) => profile.profile!
);

export const selectProfileName = createSelector(
    [selectProfileState],
    (profile) => profile.profile!.username
);

export const selectUploadingPhoto = createSelector(
    [selectProfileState],
    (profile) => profile.uploadingPhoto
);

export const selectAddPhotoMode = createSelector(
    [selectProfileState],
    (profile) => profile.addPhotoMode
);

export const selectLoading = createSelector(
    [selectProfileState],
    (profile) => profile.loading
);

export const selectLoadingActivities = createSelector(
    [selectProfileState],
    (profile) => profile.loadingActivities
);

export const selectUserActivities = createSelector(
    [selectProfileState],
    (profile) => profile.userActivities
);

export const selectSubmitting = createSelector(
    [selectProfileState],
    (profile) => profile.submitting
);

export const selectEditMode = createSelector(
    [selectProfileState],
    (profile) => profile.editMode
);

export const selectActiveTab = createSelector(
    [selectProfileState],
    (profile) => profile.activeTab
);

export const selectProfileLoading = createSelector(
    [selectProfileState],
    (profile) => profile.loadingProfile
);

export const selectProfileFollowings = createSelector(
    [selectProfileState],
    (profile) => profile.followings
);
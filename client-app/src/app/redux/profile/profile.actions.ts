import { IProfile, IPhoto } from "../../models/profile";
import { profileActionTypes } from "./profile.types";
import { IActivity } from "../../models/activity";

export const loadProfile = (username: string) => ({
    type: profileActionTypes.LOAD_PROFILE,
    payload: username
});

export const setProfile = (profile: IProfile) => ({
    type: profileActionTypes.SET_PROFILE,
    payload: profile
});

export const updateProfile = (profile: Partial<IProfile>) => ({
    type: profileActionTypes.UPDATE_PROFILE,
    payload: profile
});

export const setLoadingProfile = (mode: boolean) => ({
    type: profileActionTypes.SET_LOADING_PROFILE,
    payload: mode
});

export const setSubmitting = (mode: boolean) => ({
    type: profileActionTypes.SET_SUBMITTING,
    payload: mode
});

export const setEditMode = (mode: boolean) => ({
    type: profileActionTypes.SET_EDIT_MODE,
    payload: mode
});

export const setAddPhotoMode = (mode: boolean) => ({
    type: profileActionTypes.SET_ADD_PHOTO_MODE,
    payload: mode
});

export const setLoading = (mode: boolean) => ({
    type: profileActionTypes.SET_LOADING,
    payload: mode
});

export const setLoadingActivities = (mode: boolean) => ({
    type: profileActionTypes.SET_LOADING_ACTIVITIES,
    payload: mode
});

export const loadUserActivities = (username: string, predicate?: string) => ({
    type: profileActionTypes.LOAD_USER_ACTIVITIES,
    payload: {username, predicate}
});

export const setUserActivities = (activities: IActivity[]) => ({
    type: profileActionTypes.SET_USER_ACTIVITIES,
    payload: activities
});

export const setMainPhoto = (photo: IPhoto) => ({
    type: profileActionTypes.SET_MAIN_PHOTO,
    payload: photo
});

export const deletePhoto = (photoId: string) => ({
    type: profileActionTypes.DELETE_PHOTO,
    payload: photoId
});

export const setUploadingPhoto = (mode: boolean) => ({
    type: profileActionTypes.SET_UPLOADING_PHOTO,
    payload: mode
});

export const setActiveTab = (tab: number) => ({
    type: profileActionTypes.SET_ACTIVE_TAB,
    payload: tab
});

export const setFollowings = (followings: IProfile[]) => ({
    type: profileActionTypes.SET_FOLLOWINGS,
    payload: followings
});

export const follow = (username: string) => ({
    type: profileActionTypes.FOLLOW,
    payload: username
});

export const unfollow = (username: string) => ({
    type: profileActionTypes.UNFOLLOW,
    payload: username
});

export const uploadPhoto = (photo: Blob, fileName: string) => ({
    type: profileActionTypes.UPLOAD_PHOTO,
    payload: {photo, fileName}
});
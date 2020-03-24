import { IProfileState } from "./profileState";
import { profileActionTypes } from "./profile.types";

const INITIAL_STATE: IProfileState = {
    profile: null,
    loadingProfile: true,
    uploadingPhoto: false,
    addPhotoMode: false,
    loading: false,
    submitting: false,
    editMode: false,
    followings: [],
    activeTab: 0,
    userActivities: [],
    loadingActivities: false
}

const profileReducer = (state = INITIAL_STATE, action: { type: string, payload: any }) => {
    switch (action.type) {
        case profileActionTypes.SET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case profileActionTypes.SET_LOADING_PROFILE:
            return {
                ...state,
                loadingProfile: action.payload
            }
        case profileActionTypes.SET_LOADING_ACTIVITIES:
            return {
                ...state,
                loadingActivities: action.payload
            }
        case profileActionTypes.SET_USER_ACTIVITIES:
            return {
                ...state,
                userActivities: action.payload
            }
        case profileActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case profileActionTypes.SET_UPLOADING_PHOTO:
            return {
                ...state,
                uploadingPhoto: action.payload
            }
        case profileActionTypes.SET_ADD_PHOTO_MODE:
            return {
                ...state,
                addPhotoMode: action.payload
            }
        case profileActionTypes.SET_SUBMITTING:
            return {
                ...state,
                loading: action.payload
            }
        case profileActionTypes.SET_EDIT_MODE:
            return {
                ...state,
                editMode: action.payload
            }
        case profileActionTypes.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload
            }
        case profileActionTypes.SET_FOLLOWINGS:
            return {
                ...state,
                followings: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer;
import { IProfile, IUserActivity } from "../../models/profile";


export interface IProfileState {
    profile: IProfile | null;
    loadingProfile: boolean;
    addPhotoMode: boolean;
    uploadingPhoto: boolean;
    submitting: boolean;
    editMode: boolean;
    loading: boolean;
    followings: IProfile[];
    activeTab: number;
    userActivities: IUserActivity[];
    loadingActivities: false;
}
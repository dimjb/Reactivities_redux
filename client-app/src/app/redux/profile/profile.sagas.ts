import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { setLoading, setProfile, setLoadingProfile, setFollowings, setSubmitting, setEditMode, setUploadingPhoto, setAddPhotoMode, setLoadingActivities, setUserActivities } from './profile.actions';
import agent from '../../api/agent';
import { profileActionTypes } from './profile.types';
import { selectCurrentUserDisplayName, selectCurrentUser } from '../user/user.selectors';
import { selectProfile, selectProfileName } from './profile.selectors';
import { toast } from 'react-toastify';
import { setUserDisplayName, setUser, setUserImage } from '../user/user.actions';
import { IPhoto } from '../../models/profile';

function* loadProfile(action: any) {
    const user = yield select(selectCurrentUser);
    const profile = yield select(selectProfile);

    if (profile && user && profile.username === user.username && profile.username === action.payload)
        yield put(setProfile(profile));
    else {
        yield put(setLoadingProfile(true));

        try {
            const profile = yield call(agent.Profiles.get, action.payload);

            yield all([
                put(setProfile(profile)),
                put(setLoadingProfile(false))
            ]);

        } catch (error) {
            yield put(setLoadingProfile(false));
            console.log(error);
        }
    }
}

function* follow(action: any) {
    yield put(setLoading(true));

    try {
        yield call(agent.Profiles.follow, action.payload);

        const profile = yield select(selectProfile);
        const updatedProfile = { ...profile, following: true, followersCount: profile.followersCount + 1 }
        
        yield all([
            put(setProfile(updatedProfile)),
            put(setLoading(false))
        ]);

    } catch (error) {
        toast.error('Problem following user');
        yield put(setLoading(false));
        console.log(error);
    }
}

function* unfollow(action: any) {
    yield put(setLoading(true));

    try {
        yield call(agent.Profiles.unfollow, action.payload);
        
        const profile = yield select(selectProfile);
        const updatedProfile = { ...profile, following: false, followersCount: profile.followersCount - 1 }
        
        yield all([
            put(setProfile(updatedProfile)),
            put(setLoading(false))
        ]);

    } catch (error) {
        toast.error('Problem unfollowing user');
        yield put(setLoading(false));
        console.log(error);
    }
}

function* loadFollowings(action: any) {
    if (action.payload === 3 || action.payload === 4) {
        const predicate = action.payload === 3 ? 'followers' : 'following';
        yield put(setLoading(true));
        
        try {
            const profileUsername = yield select(selectProfileName);
            const profiles = yield call(agent.Profiles.listFollowings, profileUsername, predicate);
            
            yield all([
                put(setFollowings(profiles)),
                put(setLoading(false))
            ]);
        } catch (error) {
            toast.error('Problem loading followings');
            yield put(setLoading(false));
        }
    }
}

function* uploadPhoto(action: any) {
    yield put(setUploadingPhoto(true));

    try {
        const photo = yield call(agent.Profiles.uploadPhoto, action.payload.photo, action.payload.fileName);
        
        const profile = yield select(selectProfile);
        const updatedProfile = { ...profile, photos: [...profile.photos, photo] }
        
        yield put(setProfile(updatedProfile));
        
        const currentUser = yield select(selectCurrentUser);

        if (photo.isMain) {
            yield all([
                put(setUser({ ...currentUser, image: photo.url })),
                put(setProfile({ ...updatedProfile, image: photo.utl }))
            ]);
        }
    } catch (error) {
        console.log(error);
        toast.error('Problem uploading photo');
    }

    yield all([
        put(setAddPhotoMode(false)),
        put(setUploadingPhoto(false))
    ]);
}

function* updateProfile(action: any) {
    try {
        yield put(setSubmitting(true));
        yield call(agent.Profiles.updateProfile, action.payload);

        const currentUserDisplayName = yield select(selectCurrentUserDisplayName);
        const profile = yield select(selectProfile);

        if (action.payload.displayName !== currentUserDisplayName) {
            yield put(setUserDisplayName(action.payload.displayName));
        }

        const updatedProfile = { ...profile, ...action.payload };

        yield put(setProfile(updatedProfile));
    } catch (error) {
        toast.error('Problem updating profile....');
    }

    yield all([
        put(setEditMode(false)),
        put(setSubmitting(true))
    ]);
}

function* setMainPhoto(action: any) {
    yield put(setLoading(true));

    try {
        yield call(agent.Profiles.setMainPhoto, action.payload.id);

        const profile = yield select(selectProfile);
        
        const updatedProfilePhotos = profile.photos.map((photo: IPhoto) => {
            if (photo.isMain) {
                return Object.assign({}, photo, {
                    isMain: false
                })
            }
            if (photo.id === action.payload.id) {
                return Object.assign({}, photo, {
                    isMain: true
                })
            }
            return photo;
        });

        const updatedProfile = { ...profile, image: action.payload.url, photos: updatedProfilePhotos };
        
        yield all([
            put(setProfile(updatedProfile)),
            put(setUserImage(action.payload.url))
        ]);
    } catch (error) {
        toast.error('Problem setting photo as main');
    }

    yield put(setLoading(false));
}

function* deletePhoto(action: any) {
    yield put(setLoading(true));

    try {
        yield call(agent.Profiles.deletePhoto, action.payload);

        const profile = yield select(selectProfile);
        const updatedProfile = { ...profile, photos: profile.photos.filter((p: any) => p.id !== action.payload) };
        
        yield put(setProfile(updatedProfile));
    } catch (error) {
        toast.error('Problem setting photo as main');
    }

    yield put(setLoading(false));
}

function* loadUserActivities(action: any) {
    yield put(setLoadingActivities(true));

    try {
        const activities = yield call(agent.Profiles.listActivities, action.payload.username, action.payload.predicate);
        yield put(setUserActivities(activities));
    } catch (error) {
        toast.error('Problem loading activities');
    }

    yield put(setLoadingActivities(false));
}

function* onLoadUserActivities() {
    yield takeLatest<any>(profileActionTypes.LOAD_USER_ACTIVITIES, loadUserActivities)
}
function* onUnfollowProfile() {
    yield takeLatest<any>(profileActionTypes.UNFOLLOW, unfollow)
}
function* onFollowProfile() {
    yield takeLatest<any>(profileActionTypes.FOLLOW, follow)
}
function* onUpdatingProfile() {
    yield takeLatest<any>(profileActionTypes.UPDATE_PROFILE, updateProfile)
}
function* onLoadingProfile() {
    yield takeLatest<any>(profileActionTypes.LOAD_PROFILE, loadProfile)
}
function* onSetMainPhoto() {
    yield takeLatest<any>(profileActionTypes.SET_MAIN_PHOTO, setMainPhoto)
}
function* onSetActiveTab() {
    yield takeLatest<any>(profileActionTypes.SET_ACTIVE_TAB, loadFollowings)
}
function* onUploadPhoto() {
    yield takeLatest<any>(profileActionTypes.UPLOAD_PHOTO, uploadPhoto)
}
function* onDeletePhoto() {
    yield takeLatest<any>(profileActionTypes.DELETE_PHOTO, deletePhoto)
}

export function* profileSagas() {
    yield all([call(onLoadingProfile), call(onFollowProfile), call(onUpdatingProfile),
    call(onUnfollowProfile), call(onSetActiveTab), call(onLoadUserActivities),
    call(onUploadPhoto), call(onSetMainPhoto), call(onDeletePhoto)]);
}

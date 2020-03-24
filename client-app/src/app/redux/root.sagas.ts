import { all, call } from 'redux-saga/effects';
import {userSagas} from './user/user.sagas';
import { activitiesSagas } from './activities/activities.sagas';
import { profileSagas } from './profile/profile.sagas';

export default function* rootSaga() {
    yield all([call(userSagas), call(activitiesSagas), call(profileSagas)]);
}
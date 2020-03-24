import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { userActionTypes } from './user.types';
import agent from '../../api/agent';
import { authSuccess, authFailure, executeLogout, setUserDisplayName, setUserImage, setUser } from './user.actions';
import { closeModal } from '../modal/modal.actions';
import { history } from '../../..';
import { selectCurrentUser, selectCurrentUserImage, selectCurrentUserDisplayName } from './user.selectors';


function* getUser() {
    const user = yield select(selectCurrentUser);

    if (user) {
        yield all([
            put(authSuccess(user)),
            put(setUserDisplayName(user.displayName)),
            put(setUserImage(user.image))
        ]);
    }
    
    if (!user) {
        try {
            const user = yield call<any>(agent.User.current)

            yield all([
                put(authSuccess(user)),
                put(setUserDisplayName(user.displayName))
            ]);
        } catch (error) {
            yield put(authFailure(error))
        }
    }
}

function* register(action: any) {
    try {
        const user = yield call<any>(agent.User.register, action.payload);

        localStorage.setItem('jwt', user.token);

        yield all([
            put(authSuccess(user)),
            put(setUserDisplayName(user.displayName)),
            put(closeModal())
        ]);

        history.push('/activities');
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* logout() {
    localStorage.removeItem('jwt');

    yield put(executeLogout());

    history.push('/');
}

function* login(action: any) {
    try {
        const user = yield call<any>(agent.User.login, action.payload);

        localStorage.setItem('jwt', user.token);

        yield all([
            put(authSuccess(user)),
            put(setUserDisplayName(user.displayName)),
            put(setUserImage(user.image)),
            put(closeModal())
        ]);

        history.push('/activities');

    } catch (error) {
        yield put(authFailure(error));
    }
}

function* updateUser() {
    const user = yield select(selectCurrentUser);
    const userImage = yield select(selectCurrentUserImage);
    const userDisplayName = yield select(selectCurrentUserDisplayName);

    if (user.displayName !== userDisplayName && user.image !== userImage) {
        yield put(setUser({ ...user, image: userImage, displayName: userDisplayName }));
    }
    else {
        if (user.displayName !== userDisplayName)
            yield put(setUser({ ...user, displayName: userDisplayName }));
        if (user.image !== userImage)
            yield put(setUser({ ...user, image: userImage }));
    }
}

export function* onCheckUserSession() {
    yield takeLatest<any>(userActionTypes.CHECK_USER_SESSION, getUser)
}
export function* onRegisterStart() {
    yield takeLatest<any>(userActionTypes.REGISTER_START, register)
}
export function* onLoginStart() {
    yield takeLatest<any>(userActionTypes.LOGIN_START, login)
}
export function* onLogoutStart() {
    yield takeLatest<any>(userActionTypes.LOGOUT_START, logout)
}
export function* onUpdateUser() {
    yield takeLatest<any>(userActionTypes.UPDATE_USER, updateUser)
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onRegisterStart),
    call(onLoginStart), call(onLogoutStart), call(onUpdateUser)])
}
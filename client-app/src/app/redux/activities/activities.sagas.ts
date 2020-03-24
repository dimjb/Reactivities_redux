import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { activityActionTypes } from './activities.types';
import { selectPage, selectPredicate, selectActivity } from './activities.selectors';
import { IPredicate, IActivityMap } from './activitiesState';
import { LIMIT, axiosParams, setActivityProps, createAttendee } from '../../common/util/util';
import { setLoadingInitial, setError, setActivities, setLoadingNext, setPage, setActivityCount, setActivity, setLoading, setSubmitting } from './activities.actions';
import agent from '../../api/agent';
import { selectCurrentUser } from '../user/user.selectors';
import { toast } from 'react-toastify';
import { history } from '../../..';

let predicate = {} as IPredicate;

let activitiesMap = {} as IActivityMap;

function* setPredicate() {
    yield call(loadActivities);

    const prd = yield select(selectPredicate);

    if (prd && prd.key !== 'all') {
        if (prd && prd.key === 'isGoing' && predicate.hasOwnProperty('isHost')) {
            delete predicate['isHost'];
        }

        if (prd && prd.key === 'isHost' && predicate.hasOwnProperty('isGoing')) {
            delete predicate['isGoing'];
        }

        predicate[prd.key] = prd.value;

        yield put(setPage(0));

        activitiesMap = {};

        yield call(loadActivities);

    }
    if ((prd && prd.key === 'all')) {
        predicate = {};

        yield put(setPage(0));

        activitiesMap = {};

        yield call(loadActivities);
    }

}


function* loadMore() {
    yield put(setLoadingNext(true));

    const page = yield select(selectPage);

    yield all([
        put(setPage(page + 1)),
        call(loadActivities)
    ]);

    yield put(setLoadingNext(false));
}

function* loadActivities() {
    const page = yield select(selectPage);

    let fetchPredicate = {
        'limit': String(LIMIT),
        'offset': String(page ? page * LIMIT : 0),
    } as IPredicate;

    if (predicate.hasOwnProperty('isGoing')) {
        fetchPredicate['isGoing'] = 'true';
    }

    if (predicate.hasOwnProperty('isHost')) {
        fetchPredicate['isHost'] = 'true';
    }

    if (predicate.hasOwnProperty('startDate')) {
        fetchPredicate['startDate'] = predicate['startDate'];
    }

    yield put(setLoadingInitial(true));

    try {
        const urlParams = yield call(axiosParams, fetchPredicate);

        const activitiesEnvelope = yield call(agent.Activities.list, urlParams);
        const { activities, activityCount } = activitiesEnvelope;

        const user = yield select(selectCurrentUser);

        activities.forEach((activity: any) => {
            setActivityProps(activity, user);
            activitiesMap[activity.id] = activity;
        });

        yield all([
            put(setActivities(activitiesMap)),
            put(setActivityCount(activityCount)),
            put(setLoadingInitial(false))
        ]);

    } catch (error) {
        yield all([
            put(setLoadingInitial(false)),
            put(setError(error))
        ]);
    }
}

function* loadActivity(action: any) {
    let activity = yield select(selectActivity);

    if (activity && activity.id === action.payload) {
        yield put(setActivity(activity));
    }
    else {
        yield put(setLoadingInitial(true));

        const user = yield select(selectCurrentUser);

        try {
            activity = yield call(agent.Activities.details, action.payload);
            setActivityProps(activity, user);

            yield all([put(setActivity(activity)), put(setLoadingInitial(false))]);

        } catch (error) {
            yield all([put(setLoadingInitial(false)), put(setError(error))]);
        }

        activity = {};
    }
}

function* deleteActivity(action: any) {
    yield put(setSubmitting(true));

    try {
        yield call(agent.Activities.delete, action.payload);

        yield put(setSubmitting(false));

        toast.error('Activity deleted successfully');
    } catch (error) {
        console.log(error);
        toast.error('Problem deleting activity');

        yield put(setSubmitting(false));
    }

    history.push('/activities');
}

function* updateActivity(action: any) {
    yield put(setSubmitting(true));

    try {
        yield call(agent.Activities.update, action.payload);

        yield all([
            put(setActivity(action.payload)),
            put(setSubmitting(false))]
        );

        toast.info('Activity updated successfully');
        history.push(`/activities/${action.payload.id}`);
    } catch (error) {
        yield put(setSubmitting(false));

        console.log(error);
        toast.info('Problem updating activity');
        history.push('/activities');
    }
}

function* createActivity(action: any) {
    yield put(setSubmitting(true));

    try {
        yield call(agent.Activities.create, action.payload);

        const user = yield select(selectCurrentUser);
        const attendee = createAttendee(user);
        attendee.isHost = true;
        const attendees = [];
        attendees.push(attendee);

        const activity = {
            ...action.payload,
            attendees: attendees,
            isHost: true,
            isGoing: false,
            comments: []
        };
        
        yield all([
            put(setActivity(activity)),
            put(setSubmitting(false))
        ]);

        toast.info('Activity created successfully');
        history.push(`/activities/${action.payload.id}`);
    } catch (error) {
        yield put(setSubmitting(false));

        console.log(error);
        toast.info('Problem creating activity');
        history.push('/activities');
    }
}

function* attendActivity() {
    const user = yield select(selectCurrentUser);
    let activity = yield select(selectActivity);

    const attendee = createAttendee(user);

    activity = {
        ...activity,
        attendees: [...activity.attendees, attendee],
        isGoing: true
    };
    
    yield put(setLoading(true));

    try {
        yield call(agent.Activities.attend, activity.id);

        yield all([
            put(setActivity(activity)),
            put(setLoading(false))
        ]);

    } catch (error) {
        put(setLoading(false));
        toast.error('Problem signing up to activity!');
    }
    activity = {};
}

function* cancelAttendance() {
    const user = yield select(selectCurrentUser);

    let activity = yield select(selectActivity);
    activity = {
        ...activity,
        attendees: activity.attendees.filter((a: any) => a.username !== user.username),
        isGoing: false
    };

    yield put(setLoading(true));

    try {
        yield call(agent.Activities.unattend, activity.id);

        yield all([
            put(setActivity(activity)),
            put(setLoading(false))
        ]);
    } catch (error) {
        put(setLoading(false));
        toast.error('Problem signing up to activity!');
    }

    activity = {};
}

function* addComment(action: any) {
    let activity = yield select(selectActivity);

    activity = {
        ...activity,
        comments: [...activity.comments, action.payload]
    };

    yield put(setActivity(activity));

    activity = {};
}

function resetActivities() {
    predicate = {};
    activitiesMap = {};
}

function* onLoadMore() {
    yield takeLatest<any>(activityActionTypes.LOAD_MORE, loadMore)
}
function* onSetPredicate() {
    yield takeLatest<any>(activityActionTypes.SET_PREDICATE, setPredicate)
}

function* onLoadActivities() {
    yield takeLatest<any>(activityActionTypes.LOAD_ACTIVITIES, loadActivities)
}
function* onLoadActivity() {
    yield takeLatest<any>(activityActionTypes.LOAD_ACTIVITY, loadActivity)
}
function* onCreateActivity() {
    yield takeLatest<any>(activityActionTypes.CREATE_ACTIVITY, createActivity)
}
function* onEditActivity() {
    yield takeLatest<any>(activityActionTypes.EDIT_ACTIVITY, updateActivity)
}
function* onDeleteActivity() {
    yield takeLatest<any>(activityActionTypes.DELETE_ACTIVITY, deleteActivity)
}
function* onAttendActivity() {
    yield takeLatest<any>(activityActionTypes.ATTEND_ACTIVITY, attendActivity)
}
function* onUnattendActivity() {
    yield takeLatest<any>(activityActionTypes.UNATTEND_ACTIVITY, cancelAttendance)
}
function* onAddComment() {
    yield takeLatest<any>(activityActionTypes.ADD_COMMENT, addComment)
}
function* onResetActivities() {
    yield takeLatest<any>(activityActionTypes.RESET_ACTIVITIES, resetActivities);
}

export function* activitiesSagas() {
    yield all([call(onLoadMore), call(onDeleteActivity), call(onCreateActivity),
    call(onLoadActivities), call(onSetPredicate),
    call(onSetPredicate), call(onLoadActivity),
    call(onAttendActivity), call(onUnattendActivity),
    call(onAddComment), call(onResetActivities), call(onEditActivity)])
}
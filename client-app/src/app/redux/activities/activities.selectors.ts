import { createSelector } from 'reselect';
import { IApplicationState } from '../root.reducer';
import {LIMIT, groupActivitiesByDate} from '../../common/util/util';

const selectActivities = (state: IApplicationState) => state.activities;

const selectActivitiesForDisplay = (state: IApplicationState) => state.activities.activitiesRegistry ? 
Object.keys(state.activities.activitiesRegistry).map(key => state.activities.activitiesRegistry![key]) : [];

export const selectActivitiesByDate = createSelector(
    [selectActivitiesForDisplay],
    (activities) => groupActivitiesByDate(activities) 
);

export const selectActivity = createSelector(
    [selectActivities],
    (activities) => activities.activity
);

export const selectPage = createSelector(
    [selectActivities],
    (activities) => activities.page
);

export const selectLoadingNext = createSelector(
    [selectActivities],
    (activities) => activities.loadingNext
);

export const selectLoading = createSelector(
    [selectActivities],
    (activities) => activities.loading
);

export const selectSubmitting = createSelector(
    [selectActivities],
    (activities) => activities.submitting
);

export const selectLoadingInitial = createSelector(
    [selectActivities],
    (activities) => activities.loadingInitial
);

export const selectTotalPages = createSelector(
    [selectActivities],
    (activities) => Math.ceil(activities.activityCount / LIMIT)
);

export const selectActivityCount = createSelector(
    [selectActivities],
    (activities) => activities.activityCount
);

export const selectPredicate = createSelector(
    [selectActivities],
    (activities) => activities.predicate
);
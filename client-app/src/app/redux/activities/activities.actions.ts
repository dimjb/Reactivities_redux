import { IActivity, IComment } from "../../models/activity";
import { activityActionTypes } from "./activities.types";
import { IActivityMap } from "./activitiesState";

export const loadActivities = () => ({
    type: activityActionTypes.LOAD_ACTIVITIES
});

export const loadActivity = (id: string) => ({
    type: activityActionTypes.LOAD_ACTIVITY,
    payload: id
});

export const setActivity = (activity: IActivity) => ({
    type: activityActionTypes.SET_ACTIVITY,
    payload: activity
});

export const loadMore = () => ({
    type: activityActionTypes.LOAD_MORE
});

export const setActivities = (activitiesMap: IActivityMap | null) => ({
    type: activityActionTypes.SET_ACTIVITIES,
    payload: activitiesMap
});

export const resetActivities = () => ({
    type: activityActionTypes.RESET_ACTIVITIES
});

export const resetLoading = () => ({
    type: activityActionTypes.RESET_LOADING
});

export const setLoadingNext = (mode: boolean) => ({
    type: activityActionTypes.SET_LOADING_NEXT,
    payload: mode
});

export const setPredicate = (key: string, value: string | Date) => ({
    type: activityActionTypes.SET_PREDICATE,
    payload: {key, value}
});

export const createActivity = (activity: IActivity) => ({
    type: activityActionTypes.CREATE_ACTIVITY,
    payload: activity
});

export const editActivity = (activity: IActivity) => ({
    type: activityActionTypes.EDIT_ACTIVITY,
    payload: activity
});

export const deleteActivity = (id: string) => ({
    type: activityActionTypes.DELETE_ACTIVITY,
    payload: id
});

export const setLoadingInitial = (mode: boolean) => ({
    type: activityActionTypes.SET_LOADING_INITIAL,
    payload: mode
});

export const setLoading = (mode: boolean) => ({
    type: activityActionTypes.SET_LOADING,
    payload: mode
});

export const setSubmitting = (mode: boolean) => ({
    type: activityActionTypes.SET_SUBMITTING,
    payload: mode
});

export const setPage = (page: number) => ({
    type: activityActionTypes.SET_PAGE,
    payload: page
});

export const setActivityCount = (count: number) => ({
    type: activityActionTypes.SET_ACTIVITY_COUNT,
    payload: count
});

export const addComment = (comment: IComment) => ({
    type: activityActionTypes.ADD_COMMENT,
    payload: comment
});

export const setError = (error: string) => ({
    type: activityActionTypes.SET_ERROR,
    payload: error
});

export const attendActivity = () => ({
    type: activityActionTypes.ATTEND_ACTIVITY
});

export const unattendActivity = () => ({
    type: activityActionTypes.UNATTEND_ACTIVITY
});
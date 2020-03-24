import { IActivity } from "../../models/activity";

export interface IActivityMap {
    [id: string]: IActivity;
}

export interface IPredicate {
    [key: string]: string | Date;
}
export interface IActivitiesState {
    activitiesRegistry: IActivityMap | null;
    predicate: IPredicate | null;
    activity: IActivity | undefined;
    loadingInitial: boolean;
    loadingNext: boolean;
    loading: boolean;
    submitting: boolean;
    activityCount: number;
    page: number;
    error: string | null;
}
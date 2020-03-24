import { activityActionTypes } from "./activities.types";
import { IActivitiesState } from "./activitiesState";

const INITIAL_STATE: IActivitiesState = {
    activitiesRegistry: null,
    activity: undefined,
    loadingInitial: false,
    loadingNext: false,
    loading: false,
    submitting: false,
    activityCount: 0,
    page: 0,
    predicate: null,
    error: null
}

const activitiesReducer = (state = INITIAL_STATE, action: {type: string, payload: any}) => {
  switch (action.type) {
    case activityActionTypes.SET_LOADING_INITIAL:
      return {
        ...state,
        loadingInitial: action.payload
    };
    case activityActionTypes.SET_LOADING_NEXT:
      return {
        ...state,
        loadingNext: action.payload
    };
    case activityActionTypes.SET_ACTIVITIES:
      return {
        ...state,
         activitiesRegistry: action.payload
      };
    case activityActionTypes.RESET_ACTIVITIES:
      return {
        ...state,
        activitiesRegistry: null,
        predicate: null,
        page: 0
      };
      case activityActionTypes.SET_ACTIVITY:
        return {
          ...state,
          activity: action.payload
      };
      case activityActionTypes.SET_ACTIVITY_COUNT:
        return {
          ...state,
          activityCount: action.payload
      };
      case activityActionTypes.SET_LOADING:
        return {
          ...state,
          loading: action.payload
        }
      case activityActionTypes.SET_SUBMITTING:
        return {
          ...state,
          submitting: action.payload
        }
      case activityActionTypes.SET_PAGE:
        return {
          ...state,
          page: action.payload
        }
      case activityActionTypes.SET_PREDICATE:
        return {
          ...state,
          predicate: action.payload
        }
      case activityActionTypes.SET_ERROR:
        return {
          ...state,
          error: action.payload
        }
    default:
      return state;
  }
}

export default activitiesReducer;
  
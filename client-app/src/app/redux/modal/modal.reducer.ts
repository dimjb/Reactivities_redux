import {modalActionTypes} from './modal.types';
import { IModalState } from './modalState';
const INITIAL_STATE: IModalState = {
        open: false,
        body: ''  
}

const modalReducer = (state = INITIAL_STATE, action: {type: string, payload: string}) => {
    switch (action.type) {
      case modalActionTypes.OPEN_MODAL:
        return {
          ...state, open: true, body: action.payload
        };
      case modalActionTypes.CLOSE_MODAL:
        return {
          ...state ,open: false, body: ''
        }
      default:
        return state;
    }
  }

  export default modalReducer;
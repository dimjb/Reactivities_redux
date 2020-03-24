import { createSelector } from 'reselect';
import { IApplicationState } from '../root.reducer';

const modalState = (state: IApplicationState) => state.modal;

export const selectModal = createSelector(
  [modalState],
  (modal) => modal
);
import {modalActionTypes} from './modal.types';

export const openModal = (modalBody: string) => ({
    type: modalActionTypes.OPEN_MODAL,
    payload: modalBody
});

export const closeModal = () => ({
    type: modalActionTypes.CLOSE_MODAL
});
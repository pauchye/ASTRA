import { OPEN_MODAL, CLOSE_MODAL, CLOSE_AND_SAVE } from '../../actions/modal_actions';

export default function modalReducer(state = null, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    case CLOSE_AND_SAVE:
      return null;
    default:
      return state;
  }
}
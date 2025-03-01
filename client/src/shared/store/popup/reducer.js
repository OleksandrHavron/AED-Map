import { SHOW_POPUP, HIDE_POPUP } from './constants';

const initialState = null;

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SHOW_POPUP: {
      return {
        ...state,
        ...payload
      };
    }
    case HIDE_POPUP: {
      return null;
    }
    default:
      return state;
  }
};

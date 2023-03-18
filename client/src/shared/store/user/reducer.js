import {
  SIGNOUT,
  FAIL_SIGNIN,
  START_SIGNIN,
  SUCCESS_SIGNIN
} from './constants';

const initialState = {
  user: null,
  loading: false
};

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case START_SIGNIN:
      return {
        loading: true,
        user: null
      };
    case SUCCESS_SIGNIN:
      return {
        loading: false,
        user: payload
      };
    case FAIL_SIGNIN:
    case SIGNOUT:
      return {
        loading: false,
        user: null
      };
    default:
      return state;
  }
};

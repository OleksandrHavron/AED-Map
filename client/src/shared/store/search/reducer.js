import { SET_SEARCH } from './constants';

const initialState = {
  title: '',
  address: ''
};

export default (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_SEARCH:
      return payload;
    default:
      return state;
  }
};

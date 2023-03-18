import { SET_SEARCH } from './constants';

export function setSearch(search) {
  return {
    type: SET_SEARCH,
    payload: search
  };
}

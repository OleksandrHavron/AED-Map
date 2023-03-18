import { ADD_NEW_POINT } from './constants';

export const addNewPoint = newPoint => {
  return {
    type: ADD_NEW_POINT,
    payload: newPoint
  };
};

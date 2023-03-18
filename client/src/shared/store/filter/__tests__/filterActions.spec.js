import { mockFilter } from 'shared/mocks';

import * as actions from '../actions';
import * as types from '../constants';

describe('filter actions', () => {
  it(`should create action to ${types.SET_FILTER}`, () => {
    const expectedAction = {
      type: types.SET_FILTER,
      payload: mockFilter
    };
    expect(actions.setFilter(mockFilter)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.RESET_FILTER}`, () => {
    const expectedAction = {
      type: types.RESET_FILTER
    };
    expect(actions.resetFilter()).toEqual(expectedAction);
  });
});

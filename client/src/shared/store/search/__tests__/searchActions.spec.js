import { mockSearch } from 'shared/mocks';

import * as actions from '../actions';
import * as types from '../constants';

describe('search actions', () => {
  it(`should create action to ${types.SET_SEARCH}`, () => {
    const expectedAction = {
      type: types.SET_SEARCH,
      payload: mockSearch
    };

    expect(actions.setSearch(mockSearch)).toEqual(
      expectedAction
    );
  });
});

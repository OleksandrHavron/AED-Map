import { mockNewPoint } from 'shared/mocks';

import * as types from '../constants';
import * as actions from '../actions';

describe('mapState actions', () => {
  it(`should create action to ${types.ADD_NEW_POINT}`, () => {
    const expectedAction = {
      type: types.ADD_NEW_POINT,
      payload: mockNewPoint
    };

    expect(actions.addNewPoint(mockNewPoint)).toEqual(
      expectedAction
    );
  });
});

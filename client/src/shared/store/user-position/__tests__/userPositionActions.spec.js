import * as types from '../constants';
import * as actions from '../actions';

import { mockUserPosition } from 'shared/mocks';

describe('userPosition actions', () => {
  it(`should create action to ${types.SET_USER_POSITION}`, () => {
    const expectedAction = {
      type: types.SET_USER_POSITION,
      payload: mockUserPosition.coords
    };

    expect(
      actions.setUserPosition(mockUserPosition.coords)
    ).toEqual(expectedAction);
  });

  it(`should create action to ${types.SET_GEOLOCATION_STATUS}`, () => {
    const expectedAction = {
      type: types.SET_GEOLOCATION_STATUS,
      payload: false
    };

    expect(actions.setGeolocationStatus(false)).toEqual(
      expectedAction
    );
  });
});

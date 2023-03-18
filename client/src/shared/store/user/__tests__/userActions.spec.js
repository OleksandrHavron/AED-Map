import { mockUser, mockToken } from 'shared/mocks';

import * as types from '../constants';
import * as actions from '../actions';

describe('user actions', () => {
  it(`should create action to ${types.START_SIGNIN}`, () => {
    const expectedAction = {
      type: types.START_SIGNIN
    };
    expect(actions.startSignIn()).toEqual(expectedAction);
  });

  it(`should create action to ${types.SUCCESS_SIGNIN}`, () => {
    const expectedAction = {
      type: types.SUCCESS_SIGNIN,
      payload: mockUser
    };
    expect(
      actions.successSignIn(mockUser, mockToken)
    ).toEqual(expectedAction);
  });

  it(`should create action to ${types.FAIL_SIGNIN}`, () => {
    const expectedAction = {
      type: types.FAIL_SIGNIN
    };
    expect(actions.failSignIn()).toEqual(expectedAction);
  });

  it(`should create action to ${types.SIGNOUT}`, () => {
    const expectedAction = {
      type: types.SIGNOUT
    };
    expect(actions.signOut()).toEqual(expectedAction);
  });
});

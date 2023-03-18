import * as types from '../constants';

import * as actions from '../actions';

import { mockCurrDef } from 'shared/mocks';

describe('mapState actions', () => {
  it(`should create action to ${types.SHOW_POPUP}`, () => {
    const expectedAction = {
      type: types.SHOW_POPUP,
      payload: mockCurrDef
    };
    expect(actions.showPopup(mockCurrDef)).toEqual(
      expectedAction
    );
  });

  it(`should create action to ${types.HIDE_POPUP}`, () => {
    const expectedAction = {
      type: types.HIDE_POPUP
    };
    expect(actions.hidePopup()).toEqual(expectedAction);
  });
});

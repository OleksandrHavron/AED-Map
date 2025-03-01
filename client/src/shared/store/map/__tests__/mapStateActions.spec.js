import { mockMap } from 'shared/mocks';

import * as types from '../constants';
import * as actions from '../actions';

describe('mapState actions', () => {
  it(`should create action to ${types.SET_MAP_CENTER}`, () => {
    const expectedAction = {
      type: types.SET_MAP_CENTER,
      payload: mockMap
    };
    expect(actions.setMapCenter(mockMap)).toEqual(
      expectedAction
    );
  });
  it(`should create action to ${types.SET_MAP_ZOOM}`, () => {
    const expectedAction = {
      type: types.SET_MAP_ZOOM,
      payload: mockMap.zoom
    };
    expect(actions.setMapZoom(mockMap.zoom)).toEqual(
      expectedAction
    );
  });
});

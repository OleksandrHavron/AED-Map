import React from 'react';
import {
  render,
  screen,
  fireEvent
} from '@testing-library/react';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from 'shared/store/reducer';
import SearchMobile from './SearchMobile';

const renderWithRedux = (
  component,
  {
    initialState,
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    )
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>{component}</Provider>,
      store
    )
  };
};

describe('SearchMobile', () => {
  it('Input should exist in the document', () => {
    renderWithRedux(<SearchMobile />);

    const newContactsAmount = screen.queryByRole('textbox');
    expect(newContactsAmount).toBeInTheDocument();
  });
  it('Input should exist in the document', () => {
    renderWithRedux(<SearchMobile />);

    const newContactsAmount = screen.queryByRole('textbox');
    fireEvent.change(newContactsAmount, {
      target: { value: 'Lviv' }
    });
    expect((newContactsAmount.value = 'Lviv'));
  });
});

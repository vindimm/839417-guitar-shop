import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { createAPI } from '../../../services/api';
import { makeFakeGuitars } from '../../../utils/mocks';
import { State } from '../../../types/state';
import Header from './header';

const mockGuitars = makeFakeGuitars(5);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({ CATALOG_SEARCH: {guitarsBySearch: mockGuitars} })}>
          <Header />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
    expect(screen.getByText('О компании')).toBeInTheDocument();
  });
});

import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';

import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { makeFakeGuitars } from '../../utils/mocks';
import NotFoundPage from './not-found-page';

const mockGuitars = makeFakeGuitars(5);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {guitars: mockGuitars},
          CATALOG_SEARCH: {guitarsByName: mockGuitars},
        })}
        >
          <NotFoundPage />
        </Provider>
      </HistoryRouter>,
    );

    const linkElement = screen.getByText('Вернуться на главную');
    const headerElement = screen.getByText('404. Not Found');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});

import { Action } from 'redux';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../../../services/api';
import { State } from '../../../types/state';
import { makeFakeGuitars } from '../../../utils/mocks';
import Breadcrumbs from './breadcrumbs';

const guitarsQuantity = 5;
const mockGuitars = makeFakeGuitars(guitarsQuantity);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
          },
        })}
        >
          <Breadcrumbs />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

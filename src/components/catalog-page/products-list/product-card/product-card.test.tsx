import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { createAPI } from '../../../../services/api';
import { makeFakeGuitar, makeFakeReviewsByGuitar } from '../../../../utils/mocks';
import { State } from '../../../../types/state';
import ProductCard from './product-card';

const id = 2;
const mockGuitar = makeFakeGuitar();
const mockReviewsByGuitar = makeFakeReviewsByGuitar(Number(id));

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            reviewsByGuitar: mockReviewsByGuitar,
          },
        })}
        >
          <ProductCard product={mockGuitar} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});

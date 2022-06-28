import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { createAPI } from '../../../services/api';
import { makeFakeGuitars, makeFakeReviewsByGuitar } from '../../../utils/mocks';
import { PurchaseStatus } from '../../../const';
import { State } from '../../../types/state';
import ProductsList from './products-list';

const id = 2;
const guitarsQuantity = 5;
const mockGuitars = makeFakeGuitars(guitarsQuantity);
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
  it('should render list element correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            reviewsByGuitar: mockReviewsByGuitar,
          },
          CATALOG_CART: {
            purchasedGuitars: {},
            purchaseStatus: PurchaseStatus.Empty,
          },
        })}
        >
          <ProductsList products={mockGuitars} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should have corresponding list length', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            reviewsByGuitar: mockReviewsByGuitar,
          },
          CATALOG_CART: {
            purchasedGuitars: {},
            purchaseStatus: PurchaseStatus.Empty,
          },
        })}
        >
          <ProductsList products={mockGuitars} />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(guitarsQuantity);
  });
});

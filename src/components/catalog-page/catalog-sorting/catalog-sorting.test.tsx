import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { createAPI } from '../../../services/api';
import { makeFakeGuitars, makeFakeReviewsByGuitar } from '../../../utils/mocks';
import { PurchaseStatus, SortingOrder, SortingType } from '../../../const';
import { State } from '../../../types/state';
import CatalogPage from './../catalog-page';

const id = 2;
const guitarsQuantity = 5;
const guitarsQuantity2 = 3;
const mockGuitars = makeFakeGuitars(guitarsQuantity);
const mockGuitars2 = makeFakeGuitars(guitarsQuantity2);
const mockReviewsByGuitar = makeFakeReviewsByGuitar(Number(id));

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: CatalogSorting', () => {
  it('should render list element correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
            reviewsByGuitar: mockReviewsByGuitar,
          },
          CATALOG_SEARCH: {
            guitarsBySearch: mockGuitars2,
          },
          CATALOG_FILTER: {
            guitarsTypes: [],
            priceSearch: {
              min: null,
              max: null,
            },
            stringCount: [],
          },
          CATALOG_SORTING: {
            sortingType: SortingType.Default,
            sortingOrder: SortingOrder.Default,
          },
          CATALOG_CART: {
            purchasedGuitars: {},
            purchaseStatus: PurchaseStatus.Empty,
          },
        })}
        >
          <CatalogPage />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('по цене')).toBeInTheDocument();
    expect(screen.getByText('по популярности')).toBeInTheDocument();
  });
});

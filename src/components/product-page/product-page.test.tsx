import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { PurchaseStatus } from '../../const';
import { makeFakeReviewsByGuitar, makeFakeGuitars } from '../../utils/mocks';
import ProductPage from './product-page';

const mockStore = configureMockStore();

const id = 2;
const mockReviewsByGuitar = makeFakeReviewsByGuitar(Number(id));
const mockGuitars = makeFakeGuitars(5);

const customHistory = createMemoryHistory();

describe('Component: ProductPage', () => {
  it('should render correctly loader spinner', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
            reviewsByGuitar: mockReviewsByGuitar,
            isDataLoaded: false,
          },
          CATALOG_SEARCH: {
            guitarsBySearch: mockGuitars,
          },
          CATALOG_CART: {
            purchasedGuitars: {},
            purchaseStatus: PurchaseStatus.Empty,
          },
        })}
        >
          <ProductPage />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('three-dots-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('guitar-title-test')).not.toBeInTheDocument();
  });

  it('should render catalog page', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
            reviewsByGuitar: mockReviewsByGuitar,
            isDataLoaded: true,
          },
          CATALOG_SEARCH: {
            guitarsBySearch: mockGuitars,
          },
          CATALOG_CART: {
            purchasedGuitars: {},
            purchaseStatus: PurchaseStatus.Empty,
          },
        })}
        >
          <ProductPage />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.queryByTestId('three-dots-loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('guitar-title-test')).toBeInTheDocument();
  });
});

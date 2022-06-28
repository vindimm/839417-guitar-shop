import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { PurchaseStatus, PromoCodeStatus } from '../../const';
import { makeFakeReviewsByGuitar, makeFakeGuitars } from '../../utils/mocks';
import CartPage from './cart-page';

const mockStore = configureMockStore();

const id = 2;
const guitarsQuantity = 5;
const guitarsQuantity2 = 3;
const mockGuitars = makeFakeGuitars(guitarsQuantity);
const mockGuitars2 = makeFakeGuitars(guitarsQuantity2);
const mockReviewsByGuitar = makeFakeReviewsByGuitar(Number(id));

const customHistory = createMemoryHistory();

describe('Component: CartPage', () => {
  it('should render correctly cart page', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            guitars: mockGuitars,
            reviewsByGuitar: mockReviewsByGuitar,
            isDataLoaded: false,
          },
          CATALOG_SEARCH: {
            guitarsBySearch: mockGuitars2,
          },
          CATALOG_CART: {
            purchasedGuitars: {},
            purchasingGuitarId: null,
            purchaseStatus: PurchaseStatus.Empty,
            promoCodeStatus: PromoCodeStatus.Default,
            discountPercent: 0,
          },
        })}
        >
          <CartPage />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
    expect(screen.getByText('К оплате:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Введите промокод')).toBeInTheDocument();
  });
});

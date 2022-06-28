import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';

import { PurchaseStatus, PromoCodeStatus } from '../../../const';
import { makeFakeReviewsByGuitar } from '../../../utils/mocks';
import CartPurchaseModal from './cart-purchase-modal';

const mockStore = configureMockStore();

const mockGuitars = [
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: 'electric',
    description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
  },
  {
    id: 2,
    name: 'CURT Z300',
    vendorCode: 'TK129049',
    type: 'electric',
    description: 'Эргономичность гитары и качество сборки являются, пожалуй, её главными преимуществами. Идеальное расположение в руках музыканта дополняется прочностью конструкции из клёна.',
    previewImg: 'img/guitar-8.jpg',
    stringCount: 7,
    rating: 3.5,
    price: 29500,
  },
  {
    id: 3,
    name: 'Roman LX',
    vendorCode: 'RO111111',
    type: 'ukulele',
    description: 'Укулеле класса премиум от компании CURT, собравшая в себе все самые необходимые качесва: лёгкость корпуса, прочность струн и компактный размер.',
    previewImg: 'img/guitar-6.jpg',
    stringCount: 4,
    rating: 4,
    price: 6800,
  },
  {
    id: 4,
    name: 'CURT T300',
    vendorCode: 'TK436457',
    type: 'electric',
    description: 'CURT T300 - это шестиструнная электрогитара популярной линейки FPT. Модель с классическим стилем головы грифа и деки.',
    previewImg: 'img/guitar-3.jpg',
    stringCount: 6,
    rating: 5,
    price: 30000,
  },
  {
    id: 5,
    name: 'Dania Super',
    vendorCode: 'DI192138',
    type: 'acoustic',
    description: 'Гитары производителя Dania пользуются популярностью у музыкантов разного уровня. В модели Super идеально сочетаются демократичная цена и качество. Корпус, выполненный из тополя позволяет корпусу долгое время сохранять свой первоначальный вид.',
    previewImg: 'img/guitar-4.jpg',
    stringCount: 7,
    rating: 4.5,
    price: 3500,
  },
  {
    id: 6,
    name: 'Честер WX',
    vendorCode: 'SO934345',
    type: 'electric',
    description: 'Электрогитара с олд-скульным грифом и глянцевым корпусом для настоящих рок-музыкантов. Насыщенный звук идеально подойдет для исполнения рок-композиций.',
    previewImg: 'img/guitar-2.jpg',
    stringCount: 6,
    rating: 3.5,
    price: 15300,
  },
];

const mockReviewsByGuitar = makeFakeReviewsByGuitar(2);
const customHistory = createMemoryHistory();

const setup = () => {
  render(
    <HistoryRouter history={customHistory}>
      <Provider store={mockStore({
        CATALOG_DATA: {
          guitars: mockGuitars,
          reviewsByGuitar: mockReviewsByGuitar,
          isDataLoaded: false,
        },
        CATALOG_CART: {
          purchasedGuitars: {},
          purchasingGuitarId: 1,
          purchaseStatus: PurchaseStatus.Empty,
          promoCodeStatus: PromoCodeStatus.Default,
          discountPercent: 0,
        },
      })}
      >
        <CartPurchaseModal />
      </Provider>
    </HistoryRouter>,
  );
};

describe('Component: CartPurchaseModal', () => {
  it('should render correctly', () => {
    setup();
    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });

  it('should contain guitar name and price', () => {
    setup();
    expect(screen.getByText('Гитара Честер Bass')).toBeInTheDocument();
    expect(screen.getByText('17 500 ₽')).toBeInTheDocument();
  });
});

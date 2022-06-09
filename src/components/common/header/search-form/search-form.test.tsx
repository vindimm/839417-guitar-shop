import { Action } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { createAPI } from '../../../../services/api';
import { State } from '../../../../types/state';
import SearchForm from './search-form';

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

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const setup = () => {
  const utils = render(
    <HistoryRouter history={customHistory}>
      <Provider store={mockStore({ CATALOG_DATA: {guitars: mockGuitars} })}>
        <SearchForm />
      </Provider>
    </HistoryRouter>,
  );

  const inputElement = screen.getByLabelText('Поиск');
  return {
    inputElement,
    ...utils,
  };
};


describe('Component: SearchForm', () => {
  it('should render correctly', () => {
    const {inputElement} = setup();

    expect(inputElement).toBeInTheDocument();
    expect(screen.getByPlaceholderText('что вы ищите?')).toBeInTheDocument();
  });

  it('should render guitars filtered by name', () => {
    const {inputElement} = setup();

    expect((inputElement as HTMLInputElement).value).toBe('');
    fireEvent.change(inputElement, {target: {value: 'Честер'}});
    expect((inputElement as HTMLInputElement).value).toBe('Честер');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByText(/честер/i)).toHaveLength(2);
  });

  it('should clear input after click resetButton', () => {
    const {inputElement} = setup();

    fireEvent.change(inputElement, {target: {value: 'Some text'}});
    fireEvent.click(screen.getByText('Сбросить поиск'));
    expect((inputElement as HTMLInputElement).value).toBe('');
  });
});

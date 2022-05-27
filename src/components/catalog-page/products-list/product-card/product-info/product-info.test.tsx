import { Action } from 'redux';
import { Provider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'react-router-dom/node_modules/history';
import MockAdapter from 'axios-mock-adapter';

import { createAPI } from '../../../../../services/api';
import { fetchReviewsAction } from '../../../../../store/api-actions';
import { loadReviews } from '../../../../../store/catalog-data/catalog-data';
import { makeFakeGuitar, makeFakeReviews, makeFakeReviewsByGuitar } from '../../../../../utils/mocks';
import { APIRoute } from '../../../../../const';
import { State } from '../../../../../types/state';
import ProductInfo from './product-info';

const id = 2;
const mockGuitar = makeFakeGuitar();
const mockReviews = makeFakeReviews(id);
const mockReviewsByGuitar = makeFakeReviewsByGuitar(Number(id));

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const customHistory = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Component: ProductInfo', () => {
  it('should dispatch fetchReviewsAction when render component', async () => {

    mockAPI
      .onGet(APIRoute.Comment.replace(':id', String(id)))
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(String(id)));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadReviews.toString());
  });

  it('should render correctly', () => {
    render(
      <HistoryRouter history={customHistory}>
        <Provider store={mockStore({
          CATALOG_DATA: {
            reviewsByGuitar: mockReviewsByGuitar,
          },
        })}
        >
          <ProductInfo product={mockGuitar} />,
        </Provider>,
      </HistoryRouter>,
    );

    expect(screen.getByText('Цена:')).toBeInTheDocument();
  });
});

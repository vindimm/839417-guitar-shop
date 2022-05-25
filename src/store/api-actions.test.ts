import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { fetchGuitarsAction } from './api-actions';
import { loadGuitars } from './catalog-data/catalog-data';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { APIRoute } from '../const';
import { makeFakeGuitars } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch Load_Guitars when GET /guitars', async () => {
    const mockGuitars = makeFakeGuitars(5);

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(200, mockGuitars);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadGuitars.toString());
  });
});

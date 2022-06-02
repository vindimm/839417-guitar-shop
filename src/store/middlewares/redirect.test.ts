import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';

import { redirect } from './redirect';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';
import { State } from '../../types/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};


jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /catalog/page/:id', () => {
    store.dispatch(redirectToRoute(AppRoute.CatalogPage));
    expect(fakeHistory.location.pathname).toBe(AppRoute.CatalogPage);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.CatalogPage),
    ]);
  });

  it('should not to be redirect /catalog/guitar/:id because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.GuitarPage});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.GuitarPage);
  });
});

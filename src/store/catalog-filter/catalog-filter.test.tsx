import { catalogFilter } from './catalog-filter';

describe('Reducer: catalogFilter', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogFilter.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitarsTypes: [],
        price: {
          min: null,
          max: null,
        },
        stringCount: [],
      });
  });
});

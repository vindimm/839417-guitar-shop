import { catalogFilter } from './catalog-filter';

describe('Reducer: catalogFilter', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogFilter.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        guitarsTypes: [],
        maxPriceAvailable: 0,
        minPriceAvailable: 0,
        priceSearch: {
          min: null,
          max: null,
        },
        stringCount: [],
      });
  });
});

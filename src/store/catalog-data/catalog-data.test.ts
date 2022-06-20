import { catalogData } from './catalog-data';

describe('Reducer: catalogData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(catalogData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitars: [], reviewsByGuitar: {}, isDataLoaded: false});
  });
});

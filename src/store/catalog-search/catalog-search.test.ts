import { catalogSearch } from './catalog-search';

describe('Reducer: catalogSearch', () => {
  it('without additional parametrs should return initial state', () => {
    expect(catalogSearch.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitarsBySearch: []});
  });
});

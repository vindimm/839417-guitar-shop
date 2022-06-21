import { catalogSorting } from './catalog-sorting';
import { SortingOrder, SortingType } from '../../const';

describe('Reducer: catalogSorting', () => {
  it('without additional parameters should return initial state', () => {
    expect(catalogSorting.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        sortingType: SortingType.Default,
        sortingOrder: SortingOrder.Default,
      });
  });
});

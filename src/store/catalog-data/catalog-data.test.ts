import { catalogData, loadGuitars, loadSeveralGuitars } from './catalog-data';
import { makeFakeGuitars } from '../../utils/mocks';

const guitars0 = makeFakeGuitars(0);
const guitars1 = makeFakeGuitars(1);
const guitars5 = makeFakeGuitars(5);

describe('Reducer: catalogData', () => {
  it('without additional parametrs should return initial state', () => {
    expect(catalogData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: {}});
  });
  it('should update guitarsQuantity by load guitars', () => {
    const state = {guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: {}};
    expect(catalogData.reducer(state, loadGuitars(guitars0)))
      .toEqual({guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: {}});
    expect(catalogData.reducer(state, loadGuitars(guitars1)))
      .toEqual({guitarsQuantity: 1, activeGuitars: [], reviewsByGuitar: {}});
    expect(catalogData.reducer(state, loadGuitars(guitars5)))
      .toEqual({guitarsQuantity: 5, activeGuitars: [], reviewsByGuitar: {}});
  });
  it('should update activeGuitars by load guitars', () => {
    const state = {guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: {}};
    expect(catalogData.reducer(state, loadSeveralGuitars(guitars5)))
      .toEqual({guitarsQuantity: 0, activeGuitars: guitars5, reviewsByGuitar: {}});
  });
});

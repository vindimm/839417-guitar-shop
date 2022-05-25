import { catalogData, loadGuitars, loadSeveralGuitars, loadGuitar, loadReviews } from './catalog-data';
import { makeFakeGuitar, makeFakeGuitars, makeFakeReviews, makeFakeReviewsByGuitar } from '../../utils/mocks';

const guitar = makeFakeGuitar();
const guitars0 = makeFakeGuitars(0);
const guitars1 = makeFakeGuitars(1);
const guitars5 = makeFakeGuitars(5);
const reviews = makeFakeReviews(10);
const reviewsByGuitar10 = makeFakeReviewsByGuitar(10);

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
  it('should update activeGuitars by load severalGuitars', () => {
    const state = {guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: {}};
    expect(catalogData.reducer(state, loadSeveralGuitars(guitars5)))
      .toEqual({guitarsQuantity: 0, activeGuitars: guitars5, reviewsByGuitar: {}});
  });
  it('should update activeGuitars by load guitar', () => {
    const state = {guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: {}};
    expect(catalogData.reducer(state, loadGuitar(guitar)))
      .toEqual({guitarsQuantity: 0, activeGuitars: [guitar], reviewsByGuitar: {}});
  });
  it('should update reviewsByGuitar by load reviews', () => {
    const state = {guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: {}};
    expect(catalogData.reducer(state, loadReviews(reviews)))
      .toEqual({guitarsQuantity: 0, activeGuitars: [], reviewsByGuitar: reviewsByGuitar10});
  });
});

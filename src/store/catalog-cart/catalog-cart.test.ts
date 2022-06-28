import { PurchaseStatus, PromoCodeStatus } from '../../const';
import { catalogCart } from './catalog-cart';

describe('Reducer: catalogCart', () => {
  it('without additional parametrs should return initial state', () => {
    expect(catalogCart.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        purchasedGuitars: {},
        purchasingGuitarId: null,
        purchaseStatus: PurchaseStatus.Empty,
        promoCodeStatus: PromoCodeStatus.Default,
        discountPercent: 0,
      });
  });
});

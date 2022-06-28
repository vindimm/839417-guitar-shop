import { makeFakeGuitars } from '../utils/mocks';
import {
  getDiscountPercent,
  getGuitars,
  getGuitarsBySearch,
  getGuitarsQuantity,
  getTotalCostInCart,
  getQuantityGuitarsInCart,
  getTypeFilters
} from './selectors';
import { SortingType, SortingOrder, GuitarType, PurchaseStatus, PromoCodeStatus } from '../const';

const mockGuitarsQuantity = 8;
const mockGuitars = makeFakeGuitars(mockGuitarsQuantity);
const mockGuitarsBySearch = makeFakeGuitars(4);
const mockGuitarsTypes = [GuitarType.Acoustic, GuitarType.Electric];
const mockDiscountPercent = 15;

const store = {
  CATALOG_DATA: {
    guitars: mockGuitars,
    reviewsByGuitar: [],
    isDataLoaded: false,
  },
  CATALOG_SEARCH: {
    guitarsBySearch: mockGuitarsBySearch,
  },
  CATALOG_FILTER: {
    guitarsTypes: mockGuitarsTypes,
    price: {
      min: null,
      max: null,
    },
    stringCount: [],
  },
  CATALOG_SORTING: {
    sortingType: SortingType.Default,
    sortingOrder: SortingOrder.Default,
  },
  CATALOG_CART: {
    purchasedGuitars: {
      1: {quantity: 2, price: 1000},
      4: {quantity: 1, price: 550},
    },
    purchasingGuitarId: null,
    purchaseStatus: PurchaseStatus.Empty,
    promoCodeStatus: PromoCodeStatus.Default,
    discountPercent: mockDiscountPercent,
  },
};

describe('redux selectors', () => {
  it('should select guitars from state object', () => {
    const guitars = getGuitars(store);
    expect(guitars).toEqual(mockGuitars);
  });

  it('should select guitarsQuantity from state object', () => {
    const guitarsQuantity = getGuitarsQuantity(store);
    expect(guitarsQuantity).toEqual(mockGuitarsQuantity);
  });

  it('should select guitarsBySearch from state object', () => {
    const guitarsBySearch = getGuitarsBySearch(store);
    expect(guitarsBySearch).toEqual(mockGuitarsBySearch);
  });

  it('should select TypeFilters from state object', () => {
    const guitarsTypes = getTypeFilters(store);
    expect(guitarsTypes).toEqual(mockGuitarsTypes);
  });

  it('should select discountPercent from state object', () => {
    const discountPercent = getDiscountPercent(store);
    expect(discountPercent).toEqual(mockDiscountPercent);
  });

  it('should select totalCostInCart from state object', () => {
    const totalCostInCart = getTotalCostInCart(store);
    expect(totalCostInCart).toEqual(2550);
  });

  it('should select quantityGuitarsInCart from state object', () => {
    const quantityGuitarsInCart = getQuantityGuitarsInCart(store);
    expect(quantityGuitarsInCart).toEqual(3);
  });
});

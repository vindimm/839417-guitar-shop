import { makeFakeGuitars } from '../utils/mocks';
import { getGuitars, getGuitarsBySearch, getGuitarsQuantity, getTypeFilters } from './selectors';
import { SortingType, SortingOrder, GuitarType } from '../const';

const mockGuitarsQuantity = 8;
const mockGuitars = makeFakeGuitars(mockGuitarsQuantity);
const mockGuitarsBySearch = makeFakeGuitars(4);
const mockGuitarsTypes = [GuitarType.Acoustic, GuitarType.Electric];

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
    purchasedGuitars: {},
    isPurchasing: false,
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
});

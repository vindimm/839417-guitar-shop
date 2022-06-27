import { State } from '../types/state';
import { Guitar } from '../types/guitar';
import { NameSpace, GuitarType, stringCountByType } from '../const';

export const getGuitars = ((state: State) => state[NameSpace.CatalogData].guitars);

export const getGuitarsQuantity = ((state: State) => state[NameSpace.CatalogData].guitars.length);

export const getGuitarsBySearch = ((state: State) => state[NameSpace.CatalogSearch].guitarsBySearch);

export const getTypeFilters = ((state: State) => state[NameSpace.CatalogFilter].guitarsTypes);

export const getPriceFilters = ((state: State) => state[NameSpace.CatalogFilter].price);

export const getStringFilters = ((state: State) => state[NameSpace.CatalogFilter].stringCount);

export const getDisabledStrings = ((state: State) => {
  let enabledStrings: string[] = [];
  if (state[NameSpace.CatalogFilter].guitarsTypes.includes(GuitarType.Acoustic)) {
    enabledStrings = [...enabledStrings, ...stringCountByType.Acoustic];
  }
  if (state[NameSpace.CatalogFilter].guitarsTypes.includes(GuitarType.Electric)) {
    enabledStrings = [...enabledStrings, ...stringCountByType.Electric];
  }
  if (state[NameSpace.CatalogFilter].guitarsTypes.includes(GuitarType.Ukulele)) {
    enabledStrings = [...enabledStrings, ...stringCountByType.Ukulele];
  }
  if (state[NameSpace.CatalogFilter].guitarsTypes.length === 0) {
    enabledStrings = stringCountByType.Default;
  }

  enabledStrings = [...new Set(enabledStrings)];
  const disabledStrings = stringCountByType.Default.filter((item) => !enabledStrings.includes(item));
  return disabledStrings;
});

export const getSortingParams = ((state: State) => state[NameSpace.CatalogSorting]);

export const getIsDataLoaded = ((state: State) => state[NameSpace.CatalogData].isDataLoaded);

export const getGuitarById = (id: number | null) => (state: State) =>
  state[NameSpace.CatalogData].guitars.find((guitar: Guitar) => guitar.id === id);

export const getReviewsByGuitarId = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].reviewsByGuitar[id];

export const getPurchasedGuitars = ((state: State) => state[NameSpace.CatalogCart].purchasedGuitars);

export const getPurchasingGuitarId = ((state: State) => state[NameSpace.CatalogCart].purchasingGuitarId);

export const getPurchaseStatus = ((state: State) => state[NameSpace.CatalogCart].purchaseStatus);

export const getTotalCostInCart = ((state: State) => {
  let result = 0;
  for (const key in state[NameSpace.CatalogCart].purchasedGuitars) {
    result +=
      state[NameSpace.CatalogCart].purchasedGuitars[key].price *
      state[NameSpace.CatalogCart].purchasedGuitars[key].quantity;
  }

  return result;
});

export const getQuantityGuitarsInCart = ((state: State) => {
  let result = 0;
  for (const key in state[NameSpace.CatalogCart].purchasedGuitars) {
    result += state[NameSpace.CatalogCart].purchasedGuitars[key].quantity;
  }

  return result;
});

export const getDiscountPercent = ((state: State) => state[NameSpace.CatalogCart].discountPercent);

export const getPromoCodeStatus = ((state: State) => state[NameSpace.CatalogCart].promoCodeStatus);

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

export const getGuitarById = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].guitars.find((guitar: Guitar) => guitar.id === id);

export const getReviewsByGuitarId = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].reviewsByGuitar[id];

export const getPurchasedGuitars = ((state: State) => state[NameSpace.CatalogCart].purchasedGuitars);

export const getIsPurchasing = ((state: State) => state[NameSpace.CatalogCart].isPurchasing);

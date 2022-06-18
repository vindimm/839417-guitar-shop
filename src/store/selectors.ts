import { State } from '../types/state';
import { Guitar } from '../types/guitar';
import { NameSpace, GuitarType } from '../const';

export const getGuitars = ((state: State) => state[NameSpace.CatalogData].guitars);

export const getGuitarsQuantity = ((state: State) => state[NameSpace.CatalogData].guitars.length);

export const getGuitarsBySearch = ((state: State) => state[NameSpace.CatalogSearch].guitarsBySearch);

export const getTypeFilters = ((state: State) => state[NameSpace.CatalogFilter].guitarsTypes);

export const getPriceFilters = ((state: State) => state[NameSpace.CatalogFilter].price);

export const getStringFilters = ((state: State) => state[NameSpace.CatalogFilter].stringCount);

export const getEnabledStrings = ((state: State) => {
  let strings: number[] = [];
  if (state[NameSpace.CatalogFilter].guitarsTypes.includes(GuitarType.Acoustic)) {
    strings = [...strings, 6, 7, 12];
  }
  if (state[NameSpace.CatalogFilter].guitarsTypes.includes(GuitarType.Electric)) {
    strings = [...strings, 4, 6, 7];
  }
  if (state[NameSpace.CatalogFilter].guitarsTypes.includes(GuitarType.Ukulele)) {
    strings = [...strings, 4];
  }
  if (state[NameSpace.CatalogFilter].guitarsTypes.length === 0) {
    strings = [4, 6, 7, 12];
  }
  return [...new Set(strings)];
});

export const getSortingParams = ((state: State) => state[NameSpace.CatalogSorting]);

export const getIsDataLoaded = ((state: State) => state[NameSpace.CatalogData].isDataLoaded);

export const getGuitarById = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].guitars.find((guitar: Guitar) => guitar.id === id);

export const getReviewsByGuitarId = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].reviewsByGuitar[id];

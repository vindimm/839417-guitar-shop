import { State } from '../types/state';
import { Guitar } from '../types/guitar';
import { NameSpace } from '../const';

export const getGuitars = ((state: State) => state[NameSpace.CatalogData].guitars);

export const getGuitarsQuantity = ((state: State) => state[NameSpace.CatalogData].guitars.length);

export const getGuitarsBySearch = ((state: State) => state[NameSpace.CatalogSearch].guitarsBySearch);

export const getTypeFilters = ((state: State) => state[NameSpace.CatalogFilter].activeFilters);

export const getPriceFilters = ((state: State) => state[NameSpace.CatalogFilter].price);

export const getSortingParams = ((state: State) => state[NameSpace.CatalogSorting]);

export const getIsDataLoaded = ((state: State) => state[NameSpace.CatalogData].isDataLoaded);

export const getGuitarById = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].guitars.find((guitar: Guitar) => guitar.id === id);

export const getReviewsByGuitarId = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].reviewsByGuitar[id];

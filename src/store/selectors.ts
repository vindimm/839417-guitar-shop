import { State } from '../types/state';
import { Guitar } from '../types/guitar';
import { NameSpace } from '../const';

export const getGuitars = ((state: State) => state[NameSpace.CatalogData].guitars);

export const getGuitarsQuantity = ((state: State) => state[NameSpace.CatalogData].guitars.length);

export const getGuitarById = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].guitars.find((guitar: Guitar) => guitar.id === id);

export const getReviewsByGuitarId = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].reviewsByGuitar[id];

import { State } from '../types/state';
import { Guitar } from '../types/guitar';
import { NameSpace } from '../const';

export const getActiveGuitars = ((state: State) => state[NameSpace.CatalogData].activeGuitars);

export const getGuitarsQuantity = ((state: State) => state[NameSpace.CatalogData].guitarsQuantity);

export const getGuitarById = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].activeGuitars.find((guitar: Guitar) => guitar.id === id);

export const getCommentsByGuitarId = (id: number) => (state: State) =>
  state[NameSpace.CatalogData].commentsByGuitar[id];

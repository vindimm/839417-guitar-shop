import { State } from '../types/state';
import { Guitar } from '../types/guitar';

export const getActiveGuitars = ((state: State) => state.activeGuitars);

export const getGuitarsQuantity = ((state: State) => state.guitarsQuantity);

export const getGuitarById = (id: number) => (state: State) =>
  state.activeGuitars.find((guitar: Guitar) => guitar.id === id);

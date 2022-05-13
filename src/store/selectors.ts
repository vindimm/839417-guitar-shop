import { State } from '../types/state';

export const getGuitars = ((state: State) => state.activeGuitars);

export const getGuitarsQuantity = ((state: State) => state.guitarsQuantity);

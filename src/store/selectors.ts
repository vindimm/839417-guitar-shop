import { State } from '../types/state';

export const getActiveGuitars = ((state: State) => state.activeGuitars);

export const getGuitarsQuantity = ((state: State) => state.guitarsQuantity);

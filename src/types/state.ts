import { store } from '../store';
import { Guitars } from '../types/guitar';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogData = {
  guitarsQuantity: number;
  activeGuitars: Guitars;
}

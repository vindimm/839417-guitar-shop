import { store } from '../store';
import { Guitars } from '../types/guitar';
import { ReviewsByGuitar } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogData = {
  guitars: Guitars;
  reviewsByGuitar: ReviewsByGuitar;
}

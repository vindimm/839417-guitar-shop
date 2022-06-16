import { store } from '../store';
import { Guitars } from '../types/guitar';
import { SortingType, SortingOrder } from '../const';
import { ReviewsByGuitar } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CatalogData = {
  guitars: Guitars;
  reviewsByGuitar: ReviewsByGuitar;
  isDataLoaded: boolean;
};

export type CatalogSearch = {
  guitarsBySearch: Guitars;
};

export type CatalogFilter = {
  activeFilters: Array<string>;
  price: {
    min: number,
    max: number,
  };
}

export type CatalogSorting = {
  sortingType: SortingType,
  sortingOrder: SortingOrder,
}

import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { catalogData } from './catalog-data/catalog-data';
import { catalogSearch } from './catalog-search/catalog-search';
import { catalogFilter } from './catalog-filter/catalog-filter';
import { catalogSorting } from './catalog-sorting/catalog-sorting';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.CatalogSearch]: catalogSearch.reducer,
  [NameSpace.CatalogFilter]: catalogFilter.reducer,
  [NameSpace.CatalogSorting]: catalogSorting.reducer,
});

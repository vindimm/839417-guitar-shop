import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { catalogData } from './catalog-data/catalog-data';
import { catalogSearch } from './catalog-search/catalog-search';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer,
  [NameSpace.CatalogSearch]: catalogSearch.reducer,
});

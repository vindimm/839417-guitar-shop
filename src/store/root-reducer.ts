import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const';
import { catalogData } from './catalog-data/catalog-data';

export const rootReducer = combineReducers({
  [NameSpace.CatalogData]: catalogData.reducer,
});

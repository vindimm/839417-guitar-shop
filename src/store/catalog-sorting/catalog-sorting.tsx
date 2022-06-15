import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, SortingOrder, SortingType } from '../../const';
import { CatalogSorting } from '../../types/state';

const initialState: CatalogSorting = {
  sortingType: SortingType.Default,
  sortingOrder: SortingOrder.Default,
};

export const catalogSorting = createSlice({
  name: NameSpace.CatalogSorting,
  initialState,
  reducers: {
    installSortingType: (state, action) => {
      state.sortingType = action.payload;
    },
    installSortingOrder: (state, action) => {
      state.sortingOrder = action.payload;
    },
  },
});

export const {
  installSortingType,
  installSortingOrder,
} = catalogSorting.actions;

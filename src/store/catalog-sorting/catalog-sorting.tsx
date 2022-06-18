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
    updateSortingType: (state, action) => {
      state.sortingType = action.payload;
    },
    updateSortingOrder: (state, action) => {
      state.sortingOrder = action.payload;
    },
    resetSorting: (state) => {
      state.sortingOrder = SortingOrder.Default;
      state.sortingType = SortingType.Default;
    },
  },
});

export const {
  updateSortingType,
  updateSortingOrder,
  resetSorting,
} = catalogSorting.actions;

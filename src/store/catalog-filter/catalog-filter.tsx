import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogFilter } from '../../types/state';

const initialState: CatalogFilter = {
  activeFilters: [],
};

export const catalogFilter = createSlice({
  name: NameSpace.CatalogFilter,
  initialState,
  reducers: {
    addActiveFilter: (state, action) => {
      state.activeFilters = [...state.activeFilters, action.payload];
    },
    removeActiveFilter: (state, action) => {
      state.activeFilters = state.activeFilters.filter((item) => item !== action.payload);
    },
    resetActiveFilters: (state) => {
      state.activeFilters = [];
    },
  },
});

export const {
  addActiveFilter,
  removeActiveFilter,
  resetActiveFilters,
} = catalogFilter.actions;

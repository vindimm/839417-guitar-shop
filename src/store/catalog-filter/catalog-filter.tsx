import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogFilter } from '../../types/state';

const initialState: CatalogFilter = {
  activeFilters: [],
  price: {
    min: 0,
    max: Infinity,
  },
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
    updateMinPrice: (state, action) => {
      state.price.min = action.payload;
    },
    updateMaxPrice: (state, action) => {
      state.price.max = action.payload;
    },
  },
});

export const {
  addActiveFilter,
  removeActiveFilter,
  resetActiveFilters,
  updateMinPrice,
  updateMaxPrice,
} = catalogFilter.actions;

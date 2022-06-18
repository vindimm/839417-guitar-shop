import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogFilter } from '../../types/state';

const initialState: CatalogFilter = {
  guitarsTypes: [],
  price: {
    min: null,
    max: null,
  },
  stringCount: [],
};

export const catalogFilter = createSlice({
  name: NameSpace.CatalogFilter,
  initialState,
  reducers: {
    addActiveFilter: (state, action) => {
      state.guitarsTypes = [...state.guitarsTypes, action.payload];
    },
    removeActiveFilter: (state, action) => {
      state.guitarsTypes = state.guitarsTypes.filter((item) => item !== action.payload);
    },
    resetFilters: (state) => {
      state.guitarsTypes = [];
      state.price.min = null;
      state.price.max = null;
      state.stringCount = [];
    },
    updateMinPrice: (state, action) => {
      state.price.min = action.payload;
    },
    updateMaxPrice: (state, action) => {
      state.price.max = action.payload;
    },
    updateStringCount: (state, action) => {
      const index = state.stringCount.indexOf(action.payload);
      if (index > -1) {
        state.stringCount.splice(index, 1);
      } else {
        state.stringCount = [...state.stringCount, action.payload];
      }
    },
  },
});

export const {
  addActiveFilter,
  updateStringCount,
  removeActiveFilter,
  resetFilters,
  updateMinPrice,
  updateMaxPrice,
} = catalogFilter.actions;

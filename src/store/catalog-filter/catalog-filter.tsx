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
    addGuitarTypeFilter: (state, action) => {
      state.guitarsTypes = [...state.guitarsTypes, action.payload];
    },
    removeGuitarTypeFilter: (state, action) => {
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
    addStringCount: (state, action: {payload: string[]; type: string}) => {
      state.stringCount = [...state.stringCount, ...action.payload];
    },
    removeStringCount: (state, action: {payload: string[]; type: string}) => {
      state.stringCount = state.stringCount.filter((item) => !action.payload.includes(item));
    },
  },
});

export const {
  addGuitarTypeFilter,
  addStringCount,
  removeStringCount,
  removeGuitarTypeFilter,
  resetFilters,
  updateMinPrice,
  updateMaxPrice,
} = catalogFilter.actions;

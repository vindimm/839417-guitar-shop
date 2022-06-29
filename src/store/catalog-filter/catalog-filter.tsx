import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { Guitars } from '../../types/guitar';
import { CatalogFilter } from '../../types/state';

const initialState: CatalogFilter = {
  guitarsTypes: [],
  priceSearch: {
    min: null,
    max: null,
  },
  stringCount: [],
  minPriceAvailable: 0,
  maxPriceAvailable: 0,
};

export const catalogFilter = createSlice({
  name: NameSpace.CatalogFilter,
  initialState,
  reducers: {
    addGuitarTypeFilter: (state, action: {payload: string[]; type: string}) => {
      state.guitarsTypes = [...state.guitarsTypes, ...action.payload];
    },
    removeGuitarTypeFilter: (state, action) => {
      state.guitarsTypes = state.guitarsTypes.filter((item) => item !== action.payload);
    },
    resetFilters: (state) => {
      state.guitarsTypes = [];
      state.priceSearch.min = null;
      state.priceSearch.max = null;
      state.stringCount = [];
    },
    updateMinPrice: (state, action) => {
      state.priceSearch.min = action.payload;
    },
    updateMaxPrice: (state, action) => {
      state.priceSearch.max = action.payload;
    },
    addStringCount: (state, action: {payload: string[]; type: string}) => {
      state.stringCount = [...state.stringCount, ...action.payload];
    },
    removeStringCount: (state, action: {payload: string[]; type: string}) => {
      state.stringCount = state.stringCount.filter((item) => !action.payload.includes(item));
    },
    loadMinPriceGuitar: (state, action: {payload:Guitars, type: string}) => {
      state.minPriceAvailable = action.payload[0].price;
    },
    loadMaxPriceGuitar: (state, action: {payload:Guitars, type: string}) => {
      state.maxPriceAvailable = action.payload[0].price;
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
  loadMinPriceGuitar,
  loadMaxPriceGuitar,
} = catalogFilter.actions;

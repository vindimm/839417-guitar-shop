import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogSearch } from '../../types/state';

const initialState: CatalogSearch = {
  guitarsBySearch: [],
};

export const catalogSearch = createSlice({
  name: NameSpace.CatalogSearch,
  initialState,
  reducers: {
    loadGuitarsBySearch: (state, action) => {
      state.guitarsBySearch = action.payload;
    },
    resetGuitarsBySearch: (state) => {
      state.guitarsBySearch = [];
    },
  },
});

export const {
  loadGuitarsBySearch,
  resetGuitarsBySearch,
} = catalogSearch.actions;

import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogSearch } from '../../types/state';

const initialState: CatalogSearch = {
  guitarsByName: [],
};

export const catalogSearch = createSlice({
  name: NameSpace.CatalogSearch,
  initialState,
  reducers: {
    loadGuitarsByName: (state, action) => {
      state.guitarsByName = action.payload;
    },
    resetGuitarsByName: (state) => {
      state.guitarsByName = [];
    },
  },
});

export const {
  loadGuitarsByName,
  resetGuitarsByName,
} = catalogSearch.actions;

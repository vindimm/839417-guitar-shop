import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogData } from '../../types/state';

const initialState: CatalogData = {
  guitarsQuantity: 0,
  activeGuitars: [],
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitarsQuantity = action.payload.length;
    },
    loadSeveralGuitars: (state, action) => {
      state.activeGuitars = action.payload;
    },
    loadGuitar: (state, action) => {
      state.activeGuitars = [];
      state.activeGuitars.push(action.payload);
    },
  },
});

export const { loadGuitars, loadSeveralGuitars, loadGuitar } = catalogData.actions;

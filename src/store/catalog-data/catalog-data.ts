import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogData } from '../../types/state';

const initialState: CatalogData = {
  guitarsQuantity: 0,
  activeGuitars: [],
  reviewsByGuitar: {},
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
    loadReviews: (state, action) => {
      state.reviewsByGuitar[action.payload[0].guitarId] = action.payload;
    },
    addReview: (state, action) => {
      state.reviewsByGuitar[action.payload.guitarId].push(action.payload);
    },
  },
});

export const { loadGuitars, loadSeveralGuitars, loadGuitar, loadReviews, addReview } = catalogData.actions;

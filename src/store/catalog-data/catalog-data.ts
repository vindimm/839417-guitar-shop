import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogData } from '../../types/state';

const initialState: CatalogData = {
  guitars: [],
  reviewsByGuitar: {},
  isDataLoaded: false,
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    resetGuitars: (state) => {
      state.guitars = [];
    },
    resetIsDataLoaded: (state) => {
      state.isDataLoaded = false;
    },
    loadSortedGuitars: (state, action) => {
      state.guitars = action.payload;
      state.isDataLoaded = true;
    },
    loadGuitar: (state, action) => {
      // чтобы гитары не дублировались, проверяем нет ли уже такой гитары в стейте
      if (!state.guitars.find((guitar) => guitar.id === action.payload.id)) {
        state.guitars = [...state.guitars, action.payload];
      }
      state.isDataLoaded = true;
    },
    loadReviews: (state, action) => {
      state.reviewsByGuitar[action.payload[0].guitarId] = action.payload;
      state.isDataLoaded = true;
    },
    addReview: (state, action) => {
      state.reviewsByGuitar[action.payload.guitarId].push(action.payload);
    },
  },
});

export const {
  loadGuitars,
  resetGuitars,
  resetIsDataLoaded,
  loadSortedGuitars,
  loadGuitar,
  loadReviews,
  addReview,
} = catalogData.actions;

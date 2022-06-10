import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogData } from '../../types/state';

const initialState: CatalogData = {
  guitars: [],
  reviewsByGuitar: {},
};

export const catalogData = createSlice({
  name: NameSpace.CatalogData,
  initialState,
  reducers: {
    loadGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    loadSortedGuitars: (state, action) => {
      state.guitars = action.payload;
    },
    loadGuitar: (state, action) => {
      // чтобы гитары не дублировались, проверяем нет ли уже такой гитары в стейте
      if (!state.guitars.find((guitar) => guitar.id === action.payload.id)) {
        state.guitars = [...state.guitars, action.payload];
      }
    },
    loadReviews: (state, action) => {
      state.reviewsByGuitar[action.payload[0].guitarId] = action.payload;
    },
    addReview: (state, action) => {
      state.reviewsByGuitar[action.payload.guitarId].push(action.payload);
    },
  },
});

export const { loadGuitars, loadSortedGuitars, loadGuitar, loadReviews, addReview } = catalogData.actions;

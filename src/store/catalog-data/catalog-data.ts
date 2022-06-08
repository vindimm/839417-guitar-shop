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
    loadGuitar: (state, action) => {
      state.guitars.push(action.payload);
    },
    loadReviews: (state, action) => {
      state.reviewsByGuitar[action.payload[0].guitarId] = action.payload;
    },
    addReview: (state, action) => {
      state.reviewsByGuitar[action.payload.guitarId].push(action.payload);
    },
  },
});

export const { loadGuitars, loadGuitar, loadReviews, addReview } = catalogData.actions;

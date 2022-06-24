import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogCart } from '../../types/state';

const initialState: CatalogCart = {
  purchasedGuitars: {},
  isPurchasing: false,
};

export const catalogCart = createSlice({
  name: NameSpace.CatalogCart,
  initialState,
  reducers: {
    beginPurchasing: (state) => {
      state.isPurchasing = true;
    },
    endPurchasing: (state) => {
      state.isPurchasing = false;
    },
    addPurchasedGuitar: (state, action: {payload: {id: number, quantity: number}, type: string}) => {
      state.purchasedGuitars[action.payload.id] += action.payload.quantity;
    },
  },
});

export const {
  beginPurchasing,
  endPurchasing,
  addPurchasedGuitar,
} = catalogCart.actions;

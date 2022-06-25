import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogCart } from '../../types/state';

const initialState: CatalogCart = {
  purchasedGuitars: {},
  purchasingGuitarId: null,
};

export const catalogCart = createSlice({
  name: NameSpace.CatalogCart,
  initialState,
  reducers: {
    beginPurchasing: (state, action: {payload: number, type: string}) => {
      state.purchasingGuitarId = action.payload;
    },
    endPurchasing: (state) => {
      state.purchasingGuitarId = null;
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

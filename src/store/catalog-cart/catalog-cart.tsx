import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, PurchaseStatus } from '../../const';
import { CatalogCart } from '../../types/state';

const initialState: CatalogCart = {
  purchasedGuitars: {},
  purchasingGuitarId: null,
  purchaseStatus: PurchaseStatus.Empty,
};

export const catalogCart = createSlice({
  name: NameSpace.CatalogCart,
  initialState,
  reducers: {
    beginPurchasing: (state, action: {payload: number, type: string}) => {
      state.purchasingGuitarId = action.payload;
      state.purchaseStatus = PurchaseStatus.Choice;
    },
    addProductToCart: (state) => {
      state.purchaseStatus = PurchaseStatus.InCart;
      state.purchasedGuitars[state.purchasingGuitarId || 0] =
        state.purchasedGuitars[state.purchasingGuitarId || 0] ?
          state.purchasedGuitars[state.purchasingGuitarId || 0] + 1 :
          1;
    },
    endPurchasing: (state) => {
      state.purchasingGuitarId = null;
      state.purchaseStatus = PurchaseStatus.Empty;
    },
    addPurchasedGuitar: (state, action: {payload: {id: number, quantity: number}, type: string}) => {
      state.purchasedGuitars[action.payload.id] += action.payload.quantity;
    },
  },
});

export const {
  beginPurchasing,
  addProductToCart,
  endPurchasing,
  addPurchasedGuitar,
} = catalogCart.actions;

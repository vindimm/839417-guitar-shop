import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, PurchaseStatus, PromoCodeStatus } from '../../const';
import { CatalogCart } from '../../types/state';

const initialState: CatalogCart = {
  purchasedGuitars: {},
  purchasingGuitarId: null,
  purchaseStatus: PurchaseStatus.Empty,
  promoCodeStatus: PromoCodeStatus.Default,
  discountPercent: 0,
};

export const catalogCart = createSlice({
  name: NameSpace.CatalogCart,
  initialState,
  reducers: {
    beginPurchasing: (state, action: {payload: number, type: string}) => {
      state.purchasingGuitarId = action.payload;
      state.purchaseStatus = PurchaseStatus.Choice;
    },
    endPurchasing: (state) => {
      state.purchasingGuitarId = null;
      state.purchaseStatus = PurchaseStatus.Empty;
    },
    beginDeleting: (state, action: {payload: number, type: string}) => {
      state.purchasingGuitarId = action.payload;
      state.purchaseStatus = PurchaseStatus.Deleting;
    },
    addProductToCart: (state, action: {payload: {id: number, price: number}, type: string}) => {
      state.purchaseStatus = PurchaseStatus.InCart;
      state.purchasedGuitars[action.payload.id] = {quantity: 1, price: action.payload.price};
    },
    decreaseGuitarsCount: (state, action) => {
      state.purchasedGuitars[action.payload].quantity = state.purchasedGuitars[action.payload].quantity - 1;
    },
    increaseGuitarsCount: (state, action) => {
      state.purchasedGuitars[action.payload].quantity = state.purchasedGuitars[action.payload].quantity + 1;
    },
    updateGuitarsCount: (state, action: {payload: {id: number, quantity: number}, type: string}) => {
      state.purchasedGuitars[action.payload.id].quantity = action.payload.quantity;
    },
    addPurchasedGuitar: (state, action: {payload: {id: number, quantity: number}, type: string}) => {
      state.purchasedGuitars[action.payload.id].quantity += action.payload.quantity;
    },
    removePurchasedGuitar: (state, action) => {
      delete state.purchasedGuitars[action.payload];
    },
    setDiscount: (state, action: {payload: number, type: string}) => {
      state.discountPercent = action.payload;
    },
    setPromoCodeStatus: (state, action: {payload: PromoCodeStatus, type: string}) => {
      state.promoCodeStatus = action.payload;
    },
  },
});

export const {
  beginPurchasing,
  addProductToCart,
  endPurchasing,
  beginDeleting,
  updateGuitarsCount,
  decreaseGuitarsCount,
  increaseGuitarsCount,
  addPurchasedGuitar,
  removePurchasedGuitar,
  setDiscount,
  setPromoCodeStatus,
} = catalogCart.actions;

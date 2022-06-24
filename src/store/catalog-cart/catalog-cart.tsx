import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const';
import { CatalogCart } from '../../types/state';

const initialState: CatalogCart = {
  cartGuitars: {},
};

export const catalogCart = createSlice({
  name: NameSpace.CatalogCart,
  initialState,
  reducers: {
    addCartGuitar: (state, action: {payload: {id: number, quantity: number}, type: string}) => {
      state.cartGuitars[action.payload.id] += action.payload.quantity;
    },
  },
});

export const {
  addCartGuitar,
} = catalogCart.actions;

import { createReducer } from '@reduxjs/toolkit';

import { loadGuitars, loadSeveralGuitars } from './action';
import { Guitars } from '../types/guitar';

type State = {
  guitarsQuantity: number;
  activeGuitars: Guitars;
}

const initialState: State = {
  guitarsQuantity: 0,
  activeGuitars: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      const data = action.payload;
      state.guitarsQuantity = data.length;
    })
    .addCase(loadSeveralGuitars, (state, action) => {
      state.activeGuitars = action.payload;
    });
});

export { reducer };

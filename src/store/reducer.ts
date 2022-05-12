import { createReducer } from '@reduxjs/toolkit';

import { loadGuitars } from './action';
import { Guitars } from '../types/guitar';

type State = {
  guitars: Guitars;
}

const initialState: State = {
  guitars: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    });
});

export { reducer };

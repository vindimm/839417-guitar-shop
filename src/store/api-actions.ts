import { createAsyncThunk } from '@reduxjs/toolkit';

import { api, store } from '../store';
import { loadGuitars } from './action';
import { APIRoute } from '../const';
import { Guitars } from '../types/guitar';

export const fetchGuitarsAction = createAsyncThunk(
  'data/fetchGuitars',
  async () => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    store.dispatch(loadGuitars(data));
  },
);

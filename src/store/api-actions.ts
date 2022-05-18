import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api, store } from '../store';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { Guitar, Guitars } from '../types/guitar';
import { loadGuitars, loadSeveralGuitars, loadGuitar } from './catalog-data/catalog-data';

export const fetchGuitarsAction = createAsyncThunk(
  'data/fetchGuitars',
  async () => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars27);
    store.dispatch(loadGuitars(data));
  },
);

export const fetchSeveralGuitarsAction = createAsyncThunk<void, Array<number>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async ([startIndex, endIndex]) => {
    const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?_start=${startIndex}&_end=${endIndex}`);
    store.dispatch(loadSeveralGuitars(data));
  },
);

export const fetchGuitarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitar',
  async (id) => {
    const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(':id', id));
    store.dispatch(loadGuitar(data));
  },
);

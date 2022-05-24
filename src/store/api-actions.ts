import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { api, store } from '../store';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { Guitar, Guitars } from '../types/guitar';
import { Review, PostingReview } from '../types/review';
import { loadGuitars, loadSeveralGuitars, loadGuitar, loadReviews } from './catalog-data/catalog-data';

export const fetchGuitarsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitars',
  async () => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    store.dispatch(loadGuitars(data));
  },
);

export const fetchSeveralGuitarsAction = createAsyncThunk<void, Array<number>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSeveralGuitars',
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

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id) => {
    const {data} = await api.get<Review>(APIRoute.Comment.replace(':id', id));
    store.dispatch(loadReviews(data));
  },
);

export const sendReviewAction = createAsyncThunk<void, PostingReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addReviews',
  async (review, {dispatch}) => {
    const {data} = await api.post<Review>(APIRoute.SendComment, review);
    dispatch(loadReviews(data));
  },
);

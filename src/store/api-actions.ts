import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

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
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    dispatch(loadGuitars(data));
  },
);

export const fetchSeveralGuitarsAction = createAsyncThunk<void, Array<number>, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSeveralGuitars',
  async ([startIndex, endIndex], {dispatch, extra: api}) => {
    const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?_start=${startIndex}&_end=${endIndex}`);
    dispatch(loadSeveralGuitars(data));
  },
);

export const fetchGuitarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitar',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(':id', id));
    dispatch(loadGuitar(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Review>(APIRoute.Comment.replace(':id', id));
    dispatch(loadReviews(data));
  },
);

export const sendReviewAction = createAsyncThunk<void, PostingReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addReviews',
  async (review, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.SendComment, review);
    dispatch(loadReviews(data));
  },
);

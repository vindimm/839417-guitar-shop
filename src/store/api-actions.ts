import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { APIRoute, AppRoute, PromoCodeStatus } from '../const';
import { redirectToRoute } from './action';
import { AppDispatch, State } from '../types/state';
import { Guitar, Guitars } from '../types/guitar';
import { Review, PostingReview } from '../types/review';
import { setDiscount, setPromoCodeStatus } from '../store/catalog-cart/catalog-cart';
import {
  loadGuitars,
  loadSortedGuitars,
  loadGuitar,
  loadReviews,
  addReview
} from './catalog-data/catalog-data';
import { loadGuitarsBySearch } from './catalog-search/catalog-search';

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

export const fetchGuitarsBySearchAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitarsBySearch',
  async (name, {dispatch, extra: api}) => {
    const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?name_like=${name}`);
    dispatch(loadGuitarsBySearch(data));
  },
);

export const fetchSortedGuitarsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSortedGuitars',
  async (search, {dispatch, extra: api}) => {
    const {data} = await api.get<Guitars>(`${APIRoute.Guitars}${search}`);
    dispatch(loadSortedGuitars(data));
  },
);

export const fetchGuitarAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchGuitar',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Guitar>(APIRoute.Guitar.replace(':id', id));
      dispatch(loadGuitar(data));
    } catch(error) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
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
  'data/addReview',
  async (review, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(APIRoute.SendComment, review);
    dispatch(addReview(data));
  },
);

export const sendCouponAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'cart/sendCoupon',
  async (text, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<number>(APIRoute.SendCoupon, {coupon: text});
      dispatch(setDiscount(data));
      dispatch(setPromoCodeStatus(PromoCodeStatus.Ok));
    } catch(error) {
      dispatch(setPromoCodeStatus(PromoCodeStatus.Error));
      dispatch(setDiscount(0));
    }
  },
);

export const GUITARS_PER_PAGE = 9;
export const REVIEWS_PER_STEP = 3;
export const DEFAULT_TAB_NAME = '#characteristics';

export const stringCountByType = {
  Default: ['4', '6', '7', '12'],
  Acoustic: ['6', '7', '12'],
  Electric: ['4', '6', '7'],
  Ukulele: ['4'],
};

export enum GuitarRating {
  Initial = 0,
  Maximal = 5,
}

export enum AppRoute {
  Catalog = '/catalog',
  CatalogPage = '/catalog/page/:id',
  CatalogPage1 = '/catalog/page/1',
  CartPage = '/catalog/cart',
  GuitarPage = '/catalog/guitar/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comment = '/guitars/:id/comments',
  SendComment = '/comments',
  SendCoupon = '/coupons',
}

export enum NameSpace {
  CatalogData = 'CATALOG_DATA',
  CatalogSearch = 'CATALOG_SEARCH',
  CatalogFilter = 'CATALOG_FILTER',
  CatalogSorting = 'CATALOG_SORTING',
  CatalogCart = 'CATALOG_CART',
}

export enum TabName {
  Characteristic = '#characteristics',
  Description = '#description',
}

export enum SortingType {
  Default = 'default',
  Price = 'price',
  Rating = 'rating',
}

export enum SortingOrder {
  Default = 'default',
  Asc = 'asc',
  Desc = 'desc',
}

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum PurchaseStatus {
  Empty = 'empty',
  Choice = 'choice',
  InCart = 'inCart',
  Deleting = 'deleting',
}

export enum PromoCodeStatus {
  Default = 'default',
  Ok = 'ok',
  Error = 'error',
}

export enum GuitarsCountInCart {
  Minimal = 1,
  Maximal = 99,
}

export enum PromoCode {
  Light = 'light-333',
  Medium = 'medium-444',
  Height = 'height-555',
}

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
  GuitarPage = '/catalog/guitar/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comment = '/guitars/:id/comments',
  SendComment = '/comments',
}

export enum NameSpace {
  CatalogData = 'CATALOG_DATA',
  CatalogSearch = 'CATALOG_SEARCH',
  CatalogFilter = 'CATALOG_FILTER',
  CatalogSorting = 'CATALOG_SORTING',
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

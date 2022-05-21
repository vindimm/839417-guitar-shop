export const GUITARS_PER_PAGE = 9;

export const REVIEWS_PER_STEP = 3;

export const DEFAULT_TAB_NAME = '#characteristics';

export enum AppRoute {
  Catalog = '/catalog',
  CatalogPage = '/catalog/page/:id',
  CatalogPage1 = '/catalog/page/1',
  GuitarPage = '/catalog/guitar/:id',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comment = '/guitars/:id/comments',
  SendComment = '/comments',
}

export enum NameSpace {
  CatalogData = 'CATALOG_DATA',
  CatalogProcess = 'CATALOG_PROCESS',
}

export enum TabName {
  Characteristic = '#characteristics',
  Description = '#description',
}

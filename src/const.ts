export const GUITARS_PER_PAGE = 9;

export const REVIEWS_PER_STEP = 3;

export enum AppRoute {
  Catalog = '/catalog',
  CatalogPage = '/catalog/page/:id',
  CatalogPage1 = '/catalog/page/1',
  GuitarPage = '/catalog/guitar/:id',
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  // временный путь из-за проблем на сервере
  Guitars27 = '/guitars?_limit=27',
  Comment = '/guitars/:id/comments',
}

export enum NameSpace {
  CatalogData = 'CATALOG_DATA',
  CatalogProcess = 'CATALOG_PROCESS',
}

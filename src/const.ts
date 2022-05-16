export const GUITARS_PER_PAGE = 9;

export enum AppRoute {
  Catalog = '/catalog/page_:pageNumber',
  Product = '/product/:id'
}

export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  // временный путь из-за проблем на сервере
  Guitars27 = '/guitars?_limit=27',
}

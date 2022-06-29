import { GuitarType, SortingOrder, SortingType } from '../const';
// import { Guitars } from '../types/guitar';
import { Sorting } from '../types/sorting';

// Получение массива строк для навигации ("хлебные крошки")
export const getParsedCrumbs = (crumbs: string[], guitarTitle: string | undefined = '') => {
  const parseCrumbs = (item: string | undefined) => {
    switch (item) {
      case '':
        item = 'Главная';
        break;
      case 'catalog':
        item = 'Каталог';
        break;
      case 'guitar':
        item = guitarTitle;
        break;
      case 'cart':
        item = 'Корзина';
        break;
      default:
        item = '';
    }
    return item;
  };

  return crumbs.map(parseCrumbs).filter((item) => item !== '');
};

// Перевод числового балла (от 1 до 5) в словесную оценку
export const getMark = (rating: number): string => {
  let mark: string;

  switch (rating) {
    case 1:
      mark = 'Ужасно';
      break;
    case 2:
      mark = 'Плохо';
      break;
    case 3:
      mark = 'Нормально';
      break;
    case 4:
      mark = 'Хорошо';
      break;
    case 5:
      mark = 'Отлично';
      break;
    default:
      mark = 'Неизвестно';
  }

  return mark;
};

// Получение размеров для SVG в зависимости от аргумента 'size'
export const getDimensions = (size: 'small' | 'middle' | 'large'): [number, number] => {
  let width: number;
  let height: number;

  switch (size) {
    case 'small':
      width = 12;
      height = 11;
      break;
    case 'middle':
      width = 14;
      height = 14;
      break;
    case 'large':
      width = 16;
      height = 16;
      break;
    default:
      width = 14;
      height = 14;
  }

  return [width, height];
};

// Перевод типа гитары в русскоязычное название
export const getGuitarType = (type: string | undefined) => {
  let result: string;

  switch (type) {
    case GuitarType.Acoustic :
      result = 'Акустическая';
      break;
    case GuitarType.Electric:
      result = 'Електрогитара';
      break;
    case GuitarType.Ukulele:
      result = 'Укулеле';
      break;
    default:
      result = '';
  }

  return result;
};

// Превращает строку из пробелов в пустую строку
export const validateString = (text: string): string => {
  let result = text.replace(/\s+/g, ' ');
  if (result === ' ') {
    result = '';
  }
  return result;
};

// Принимает search-строку и возвращает объект с get-параметрами и их значениями
export const getSearchParams = (search: string): Record<string, string[]> => {
  const result: Record<string, string[]> = {};
  search
    .substring(1)
    .split('&')
    .forEach((item) => {
      const param = item.split('=');

      if (param[0] in result) {
        result[param[0]].push(param[1]);
      } else {
        result[param[0]] = [param[1]];
      }
    });
  return result;
};

// Принимает параметры фильтрации и сортировки и возвращает строку search-запроса
export const createSearchQuery =
  ( typeFilters: string[],
    priceFilters: Record<'min' | 'max', number | null>,
    stringCountFilters: string[],
    sortingParams: Sorting,
  ): string =>
  {
    const createTypeQuery = (types: string[]): string => types.length > 0
      ? `type=${types.join('&type=')}`
      : '';

    const createSortQuery = (sortes: Sorting): string => {
      const sortingQuery = sortes.sortingType !== SortingType.Default
        ? `_sort=${sortingParams.sortingType}`
        : '';

      return sortes.sortingOrder !== SortingOrder.Default
        ? `${sortingQuery}&_order=${sortingParams.sortingOrder}`
        : sortingQuery;
    };

    const createStringCountQuery = (strings: string[]): string => strings.length > 0
      ? `stringCount=${strings.join('&stringCount=')}`
      : '';

    const createPriceQuery = (prices: Record<'min' | 'max', number | null>) => {
      const minPrice = prices.min ? `price_gte=${prices.min}` : '';
      const maxPrice = prices.max ? `price_lte=${prices.max}` : '';
      return [minPrice, maxPrice].filter((item) => (item !== '')).join('&');
    };

    const queries: string[] =
      [
        createTypeQuery(typeFilters),
        createSortQuery(sortingParams),
        createPriceQuery(priceFilters),
        createStringCountQuery(stringCountFilters),
      ]
        .filter((item) => item !== '');

    return queries.length > 0 ? `?${queries.join('&')}` : '';
  };

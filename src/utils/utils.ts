import { SortingOrder, SortingType } from '../const';
import { Guitars } from '../types/guitar';
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
export const createSearchQuery = (filterParams: string[], sortingParams: Sorting): string => {
  let result = '';
  let sortingQuery = '';
  const filterQuery = filterParams.length > 0 ? `type=${filterParams.join('&type=')}` : '';

  if (sortingParams.sortingType !== SortingType.Default) {
    sortingQuery = `?_sort=${sortingParams.sortingType}`;
  }
  if (sortingParams.sortingOrder !== SortingOrder.Default) {
    sortingQuery = `${sortingQuery}&_order=${sortingParams.sortingOrder}`;
  }

  if (sortingQuery && filterQuery) {
    result = `${sortingQuery}&${filterQuery}`;
  }
  if (sortingQuery && !filterQuery) {
    result = `${sortingQuery}${filterQuery}`;
  }
  if (!sortingQuery && filterQuery) {
    result = `?${filterQuery}`;
  }

  return result;
};

export const getMinPrice = (guitars: Guitars): number => Math.min(...guitars.map((guitar) => guitar.price));

export const getMaxPrice = (guitars: Guitars): number => Math.max(...guitars.map((guitar) => guitar.price));

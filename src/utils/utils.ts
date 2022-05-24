// Получение массива строк для навигации ("хлебные крошки")
export const getParsedCrumbs = (crumbs: string[], guitarTitle: string | undefined) => {
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

import { getParsedCrumbs } from './utils';

describe('testing function getParsedCrumbs', () => {
  it('should be empty array', () => {
    expect(getParsedCrumbs([])).toEqual([]);
  });
  it('should be equal ["Главная", "Каталог", "Корзина"]', () => {
    expect(getParsedCrumbs(['', 'catalog', 'cart'])).toEqual(['Главная', 'Каталог', 'Корзина']);
  });
  it('should delete all unclear strings', () => {
    expect(getParsedCrumbs(['', 'blabla0', 'catalog', 'blabla1', 'blabla2'])).toEqual(['Главная', 'Каталог']);
  });
  it('should use guitar name', () => {
    expect(getParsedCrumbs(['', 'catalog', 'guitar'], 'Название гитары')).toEqual(['Главная', 'Каталог', 'Название гитары']);
  });
});

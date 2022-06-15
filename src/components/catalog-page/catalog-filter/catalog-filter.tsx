// Этот компонент меняет state.CATALOG_FILTERS.activeFilters добавляя и удаляя фильтры
// в зависимости от того, что выбрал пользователь и того, что пришло из адресной строки.
// За изменением state.CATALOG_FILTERS.activeFilters следит компонент CatalogPage и
// совершает соответсвующие get-запросы на получение гитар с учетом нужных фильтров
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../../hooks';
import { GuitarType } from '../../../const';
import { getSearchParams } from '../../../utils/utils';
import { addActiveFilter, removeActiveFilter, resetActiveFilters } from '../../../store/catalog-filter/catalog-filter';

function CatalogFilter (): JSX.Element {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const { type }  = getSearchParams(search);

  const [acousticGuitarActive, setAcousticGuitarActive] = useState(type?.includes(GuitarType.Acoustic));
  const [electricGuitarActive, setElectricGuitarActive] = useState(type?.includes(GuitarType.Electric));
  const [ukuleleGuitarActive, setUkuleleGuitarActive] = useState(type?.includes(GuitarType.Ukulele));

  useEffect(() => {
    type?.forEach((item) => dispatch(addActiveFilter(item)));
  }, []);

  const handleAcousticCheckbox = () => {
    if (acousticGuitarActive) {
      setAcousticGuitarActive(false);
      dispatch(removeActiveFilter(GuitarType.Acoustic));
    } else {
      setAcousticGuitarActive(true);
      dispatch(addActiveFilter(GuitarType.Acoustic));
    }
  };

  const handleElectricCheckbox = () => {
    if (electricGuitarActive) {
      setElectricGuitarActive(false);
      dispatch(removeActiveFilter(GuitarType.Electric));
    } else {
      setElectricGuitarActive(true);
      dispatch(addActiveFilter(GuitarType.Electric));
    }
  };

  const handleUkuleleCheckbox = () => {
    if (ukuleleGuitarActive) {
      setUkuleleGuitarActive(false);
      dispatch(removeActiveFilter(GuitarType.Ukulele));
    } else {
      setUkuleleGuitarActive(true);
      dispatch(addActiveFilter(GuitarType.Ukulele));
    }
  };

  const handleResetButton = () => {
    setAcousticGuitarActive(false);
    setElectricGuitarActive(false);
    setUkuleleGuitarActive(false);
    dispatch(resetActiveFilters());
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number" placeholder="1 000" id="priceMin" name="от"/>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number" placeholder="30 000" id="priceMax" name="до"/>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            checked={acousticGuitarActive}
            onChange={handleAcousticCheckbox}
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            checked={electricGuitarActive}
            onChange={handleElectricCheckbox}
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            checked={ukuleleGuitarActive}
            onChange={handleUkuleleCheckbox}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings" checked readOnly/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings" checked readOnly/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings" disabled/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
        onClick={handleResetButton}
      >
        Очистить
      </button>
    </form>
  );
}

export default CatalogFilter;

// Этот компонент меняет state.CATALOG_FILTERS.activeFilters добавляя и удаляя фильтры
// в зависимости от того, что выбрал пользователь и того, что пришло из адресной строки.
// За изменением state.CATALOG_FILTERS.activeFilters следит компонент CatalogPage и
// совершает соответсвующие get-запросы на получение гитар с учетом нужных фильтров
import { useEffect, useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { GuitarType } from '../../../const';
import { getGuitars, getIsDataLoaded } from '../../../store/selectors';
import { getSearchParams, getMinPrice, getMaxPrice } from '../../../utils/utils';
import { resetSorting } from '../../../store/catalog-sorting/catalog-sorting';
import {
  addActiveFilter,
  removeActiveFilter,
  resetFilters,
  updateMinPrice,
  updateMaxPrice
} from '../../../store/catalog-filter/catalog-filter';

function CatalogFilter (): JSX.Element {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const { type }  = getSearchParams(search);
  const guitars = useAppSelector(getGuitars);

  const [acousticGuitarActive, setAcousticGuitarActive] = useState(type?.includes(GuitarType.Acoustic));
  const [electricGuitarActive, setElectricGuitarActive] = useState(type?.includes(GuitarType.Electric));
  const [ukuleleGuitarActive, setUkuleleGuitarActive] = useState(type?.includes(GuitarType.Ukulele));

  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');

  const minPricePlaceholder = getMinPrice(guitars);
  const maxPricePlaceholder = getMaxPrice(guitars);

  const isDataLoaded = useAppSelector(getIsDataLoaded);

  useEffect(() => {
    type?.forEach((item) => dispatch(addActiveFilter(item)));
    return () => {
      dispatch(resetFilters());
    };
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
    dispatch(resetFilters());
    dispatch(resetSorting());
    setMinPriceValue('');
    setMaxPriceValue('');
  };

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMinPriceValue(evt.target.value);
  };

  const handleMinPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (minPriceValue !== '') {
      if (Number(minPriceValue) < minPricePlaceholder) {
        setMinPriceValue(String(minPricePlaceholder));
        dispatch(updateMinPrice(minPricePlaceholder));
      } else {
        setMinPriceValue(evt.target.value);
        dispatch(updateMinPrice(Number(evt.target.value)));
      }
    } else {
      setMinPriceValue('');
      dispatch(updateMinPrice(null));
    }
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMaxPriceValue(evt.target.value);
  };

  const handleMaxPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    if (maxPriceValue !== '') {
      if (Number(maxPriceValue) > maxPricePlaceholder) {
        setMaxPriceValue(String(maxPricePlaceholder));
        dispatch(updateMaxPrice(maxPricePlaceholder));
      } else if (Number(maxPriceValue) < Number(minPriceValue)) {
        setMaxPriceValue(String(minPriceValue));
        dispatch(updateMaxPrice(minPriceValue));
      } else {
        setMaxPriceValue(evt.target.value);
        dispatch(updateMaxPrice(Number(evt.target.value)));
      }
    } else {
      setMaxPriceValue('');
      dispatch(updateMaxPrice(null));
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>

        {isDataLoaded ?
          <div className="catalog-filter__price-range">
            <div className="form-input">
              <label className="visually-hidden">Минимальная цена</label>
              <input
                type="number"
                min="0"
                id="priceMin"
                name="от"
                value={minPriceValue}
                placeholder={String(minPricePlaceholder)}
                onChange={handleMinPriceChange}
                onBlur={handleMinPriceBlur}
              />
            </div>
            <div className="form-input">
              <label className="visually-hidden">Максимальная цена</label>
              <input
                type="number"
                min={minPriceValue}
                id="priceMax"
                name="до"
                value={maxPriceValue}
                placeholder={String(maxPricePlaceholder)}
                onChange={handleMaxPriceChange}
                onBlur={handleMaxPriceBlur}
              />
            </div>
          </div> :
          <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '100%'}}>
            <ThreeDots color="#888888" height={30} width={30} />
          </div>}

      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            checked={acousticGuitarActive || false}
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
            checked={electricGuitarActive || false}
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
            checked={ukuleleGuitarActive || false}
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

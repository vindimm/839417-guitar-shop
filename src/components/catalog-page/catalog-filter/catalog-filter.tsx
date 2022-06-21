// Этот компонент меняет state.CATALOG_FILTERS.activeFilters добавляя и удаляя фильтры
// в зависимости от того, что выбрал пользователь и того, что пришло из адресной строки.
// За изменением state.CATALOG_FILTERS.activeFilters следит компонент CatalogPage и
// совершает соответсвующие get-запросы на получение гитар с учетом нужных фильтров
import { useEffect, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { GuitarType } from '../../../const';
import { getGuitars, getIsDataLoaded, getEnabledStrings } from '../../../store/selectors';
import { getSearchParams, getMinPrice, getMaxPrice } from '../../../utils/utils';
import { resetSorting } from '../../../store/catalog-sorting/catalog-sorting';
import {
  addActiveFilter,
  removeActiveFilter,
  resetFilters,
  updateMinPrice,
  updateMaxPrice,
  updateStringCount
} from '../../../store/catalog-filter/catalog-filter';

function CatalogFilter (): JSX.Element {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const { type, stringCount }  = getSearchParams(search);
  const guitars = useAppSelector(getGuitars);

  const [acousticGuitarActive, setAcousticGuitarActive] = useState(type?.includes(GuitarType.Acoustic));
  const [electricGuitarActive, setElectricGuitarActive] = useState(type?.includes(GuitarType.Electric));
  const [ukuleleGuitarActive, setUkuleleGuitarActive] = useState(type?.includes(GuitarType.Ukulele));

  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');

  const [isStringCount4, setIsStringCount4] = useState(stringCount?.includes('4'));
  const [isStringCount6, setIsStringCount6] = useState(stringCount?.includes('6'));
  const [isStringCount7, setIsStringCount7] = useState(stringCount?.includes('7'));
  const [isStringCount12, setIsStringCount12] = useState(stringCount?.includes('12'));

  const minPricePlaceholder = getMinPrice(guitars);
  const maxPricePlaceholder = getMaxPrice(guitars);

  const enabledStrings = useAppSelector(getEnabledStrings);

  const isDataLoaded = useAppSelector(getIsDataLoaded);

  useEffect(() => {
    type?.forEach((item) => dispatch(addActiveFilter(item)));
    stringCount?.forEach((item) => dispatch(updateStringCount(item)));
    return () => {
      dispatch(resetFilters());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renewMinPrice = (evt: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    if (minPriceValue !== '') {
      if (Number(minPriceValue) < minPricePlaceholder) {
        setMinPriceValue(String(minPricePlaceholder));
        dispatch(updateMinPrice(minPricePlaceholder));
      } else {
        setMinPriceValue(evt.currentTarget.value);
        dispatch(updateMinPrice(Number(evt.currentTarget.value)));
      }
    } else {
      setMinPriceValue('');
      dispatch(updateMinPrice(null));
    }
  };

  const renewMaxPrice = (evt: KeyboardEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    if (maxPriceValue !== '') {
      if (Number(maxPriceValue) > maxPricePlaceholder) {
        setMaxPriceValue(String(maxPricePlaceholder));
        dispatch(updateMaxPrice(maxPricePlaceholder));
      } else if (Number(maxPriceValue) < Number(minPriceValue)) {
        setMaxPriceValue(String(minPriceValue));
        dispatch(updateMaxPrice(minPriceValue));
      } else {
        setMaxPriceValue(evt.currentTarget.value);
        dispatch(updateMaxPrice(Number(evt.currentTarget.value)));
      }
    } else {
      setMaxPriceValue('');
      dispatch(updateMaxPrice(null));
    }
  };

  const handleStringCount4 = () => {
    setIsStringCount4(!isStringCount4);
    dispatch(updateStringCount('4'));
  };

  const handleStringCount6 = () => {
    setIsStringCount6(!isStringCount6);
    dispatch(updateStringCount('6'));
  };

  const handleStringCount7 = () => {
    setIsStringCount7(!isStringCount7);
    dispatch(updateStringCount('7'));
  };

  const handleStringCount12 = () => {
    setIsStringCount12(!isStringCount12);
    dispatch(updateStringCount('12'));
  };

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
    setMinPriceValue('');
    setMaxPriceValue('');
    setIsStringCount4(false);
    setIsStringCount6(false);
    setIsStringCount7(false);
    setIsStringCount12(false);
    dispatch(resetFilters());
    dispatch(resetSorting());
  };

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMinPriceValue(evt.target.value);
  };

  const handleMinPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    renewMinPrice(evt);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMaxPriceValue(evt.target.value);
  };

  const handleMaxPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    renewMaxPrice(evt);
  };

  const handleMinPriceKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === '-') {
      evt.preventDefault();
    }
    if (evt.key === 'Enter') {
      renewMinPrice(evt);
    }
  };

  const handleMaxPriceKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === '-') {
      evt.preventDefault();
    }
    if (evt.key === 'Enter') {
      renewMaxPrice(evt);
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
                pattern="[0-9]"
                onKeyPress={handleMinPriceKeyPress}
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
                pattern="[0-9]"
                onKeyPress={handleMaxPriceKeyPress}
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
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            checked={isStringCount4 || false}
            onChange={handleStringCount4}
            disabled={!enabledStrings.includes(4)}
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            checked={isStringCount6 || false}
            onChange={handleStringCount6}
            disabled={!enabledStrings.includes(6)}
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            checked={isStringCount7 || false}
            onChange={handleStringCount7}
            disabled={!enabledStrings.includes(7)}
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            checked={isStringCount12 || false}
            onChange={handleStringCount12}
            disabled={!enabledStrings.includes(12)}
          />
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

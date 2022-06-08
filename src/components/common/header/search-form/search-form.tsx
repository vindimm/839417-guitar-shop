import { useState, useEffect, ChangeEvent } from 'react';

import { useAppDispatch } from '../../../../hooks';
import { fetchGuitarsAction } from '../../../../store/api-actions';

function SearchForm (): JSX.Element {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  useEffect(() => {
    dispatch(fetchGuitarsAction);
  }, [dispatch]);

  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className="form-search__select-list hidden">
        <li className="form-search__select-item" tabIndex={0}>Честер Plus</li>
        <li className="form-search__select-item" tabIndex={0}>Честер UX</li>
        <li className="form-search__select-item" tabIndex={0}>Честер UX2</li>
        <li className="form-search__select-item" tabIndex={0}>Честер UX3</li>
        <li className="form-search__select-item" tabIndex={0}>Честер UX4</li>
        <li className="form-search__select-item" tabIndex={0}>Честер UX5</li>
      </ul>
      <button className="form-search__reset" type="reset" form="form-search">
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;

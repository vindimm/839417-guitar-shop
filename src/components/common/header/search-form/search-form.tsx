import { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getGuitars } from '../../../../store/selectors';
import { fetchGuitarsAction } from '../../../../store/api-actions';
import { Guitars } from '../../../../types/guitar';
import { AppRoute } from '../../../../const';

function SearchForm (): JSX.Element {
  const emptyGuitars: Guitars = [];
  const dispatch = useAppDispatch();
  const guitars = useAppSelector(getGuitars);

  const [searchValue, setSearchValue] = useState('');
  const [filteredGuitars, setFilteredGuitars] = useState(emptyGuitars);

  const filterGuitarsByName = (arr: Guitars, query: string): Guitars =>
    arr.filter((guitar) => guitar.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
    setFilteredGuitars(filterGuitarsByName(guitars, evt.target.value));
    if (evt.target.value === '') {
      setFilteredGuitars(emptyGuitars);
    }
  };

  const handleResetButton = () => {
    setSearchValue('');
    setFilteredGuitars(emptyGuitars);
  };

  useEffect(() => {
    dispatch(fetchGuitarsAction());
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
      <ul className={`form-search__select-list ${filteredGuitars.length > 0 ? 'list-opened' : 'hidden'}`}>
        {filteredGuitars.map((guitar) => (
          <li
            className="form-search__select-item"
            tabIndex={0}
            key={guitar.id}
          >
            <Link
              className="form-search__select-item"
              to={AppRoute.GuitarPage.replace(':id', String(guitar.id))}
              style={{display: 'inline-block', width: '100%', padding: '0'}}
            >
              {guitar.name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className="form-search__reset"
        type="reset"
        form="form-search"
        onClick={handleResetButton}
      >
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;

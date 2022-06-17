// Этот компонент меняет state.CATALOG_SORTING изменяя тип и порядок сортировки
// в зависимости от того, что выбрал пользователь и того, что пришло из адресной строки.
// За изменением state.CATALOG_SORTING следит компонент CatalogPage и
// совершает соответсвующие get-запросы на получение гитар с учетом нужных параметров сортировки
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getSearchParams } from '../../../utils/utils';
import { getSortingParams } from '../../../store/selectors';
import { installSortingType, installSortingOrder } from '../../../store/catalog-sorting/catalog-sorting';
import { SortingType, SortingOrder } from '../../../const';

function CatalogSorting (): JSX.Element {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const {_sort, _order}  = getSearchParams(search);

  const params = useAppSelector(getSortingParams);

  const [sortingType, setSortingType] = useState(_sort ? _sort[0] : SortingType.Default);
  const [sortingOrder, setSortingOrder] = useState(_order ? _order[0] : SortingOrder.Default);

  useEffect(() => {
    setSortingType(params.sortingType);
    setSortingOrder(params.sortingOrder);
  }, [params.sortingType, params.sortingOrder]);

  const handlePriceSort = () => {
    dispatch(installSortingType(SortingType.Price));
    setSortingType(SortingType.Price);
  };

  const handleRatingSort = () => {
    dispatch(installSortingType(SortingType.Rating));
    setSortingType(SortingType.Rating);
  };

  const handleSortingUp = () => {
    if (sortingType === SortingType.Default) {
      dispatch(installSortingType(SortingType.Price));
      setSortingType(SortingType.Price);
    }
    dispatch(installSortingOrder(SortingOrder.Asc));
    setSortingOrder(SortingOrder.Asc);
  };

  const handleSortingDown = () => {
    if (sortingType === SortingType.Default) {
      dispatch(installSortingType(SortingType.Price));
      setSortingType(SortingType.Price);
    }
    dispatch(installSortingOrder(SortingOrder.Desc));
    setSortingOrder(SortingOrder.Desc);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button ${sortingType === SortingType.Price ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          onClick={handlePriceSort}
        >
            по цене
        </button>
        <button
          className=
            {`catalog-sort__type-button 
            ${sortingType === SortingType.Rating ? 'catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={handleRatingSort}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className=
            {`catalog-sort__order-button catalog-sort__order-button--up 
            ${sortingOrder === SortingOrder.Asc ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          onClick={handleSortingUp}
        >
        </button>
        <button
          className=
            {`catalog-sort__order-button catalog-sort__order-button--down 
            ${sortingOrder === SortingOrder.Desc ? 'catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={handleSortingDown}
        >
        </button>
      </div>
    </div>
  );
}

export default CatalogSorting;

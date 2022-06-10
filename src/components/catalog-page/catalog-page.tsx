import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchSortedGuitarsAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/action';
import { getGuitars } from '../../store/selectors';
import { AppRoute, GUITARS_PER_PAGE, SortingType, SortingOrder } from '../../const';
import { getSearchParams } from '../../utils/utils';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import ProductList from './products-list/products-list';
import Pagination from './pagination/pagination';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const { search } = useLocation();
  const startIndex = (Number(id) - 1) * GUITARS_PER_PAGE;
  const endIndex = startIndex + GUITARS_PER_PAGE;
  const guitars = useAppSelector(getGuitars);

  const searchParams = getSearchParams(search);

  const [sortingType, setSortingType] = useState(searchParams._sort || SortingType.Default);
  const [sortingOrder, setSortingOrder] = useState(searchParams._order || SortingOrder.Default);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (search) {
      dispatch(fetchSortedGuitarsAction(search));
    }
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(redirectToRoute(searchQuery));
  }, [searchQuery, dispatch, sortingType, sortingOrder]);

  const handlePriceSort = () => {
    setSortingType(SortingType.Price);
    if (sortingOrder === SortingOrder.Default) {
      setSortingOrder(SortingOrder.Asc);
    }
    if (sortingOrder === SortingOrder.Desc) {
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${SortingType.Price}&_order=${SortingOrder.Desc}`);
    } else {
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${SortingType.Price}`);
    }
  };

  const handleRatingSort = () => {
    setSortingType(SortingType.Rating);
    if (sortingOrder === SortingOrder.Default) {
      setSortingOrder(SortingOrder.Asc);
    }
    if (sortingOrder === SortingOrder.Desc) {
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${SortingType.Rating}&_order=${SortingOrder.Desc}`);
    } else {
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${SortingType.Rating}`);
    }
  };

  const handleSortingUp = () => {
    setSortingType(sortingType);
    setSortingOrder(SortingOrder.Asc);
    if (sortingType === SortingType.Default) {
      setSortingType(SortingType.Price);
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${SortingType.Price}`);
    } else {
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${sortingType}`);
    }
  };

  const handleSortingDown = () => {
    setSortingType(sortingType);
    setSortingOrder(SortingOrder.Desc);
    if (sortingType === SortingType.Default) {
      setSortingType(SortingType.Price);
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${SortingType.Price}&_order=${SortingOrder.Desc}`);
    } else {
      setSearchQuery(`${AppRoute.CatalogPage1}?_sort=${sortingType}&_order=${SortingOrder.Desc}`);
    }
  };

  return (
    <div className="wrapper">
      <Header isCatalogPage />
      <main className="page-content">
        <div className="container">
          <Breadcrumbs />
          <div className="catalog">
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
                  <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"/>
                  <label htmlFor="acoustic">Акустические гитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="electric" name="electric" checked readOnly/>
                  <label htmlFor="electric">Электрогитары</label>
                </div>
                <div className="form-checkbox catalog-filter__block-item">
                  <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked readOnly/>
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
              <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
            </form>
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
            <ProductList products={guitars?.slice(startIndex, endIndex)} />
            <Pagination pageNumber={Number(id)} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;

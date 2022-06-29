import { useEffect, KeyboardEvent } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchMinPriceGuitarAction, fetchMaxPriceGuitarAction, fetchSortedGuitarsAction } from '../../store/api-actions';
import { endPurchasing } from '../../store/catalog-cart/catalog-cart';
import { redirectToRoute } from '../../store/action';
import { createSearchQuery } from '../../utils/utils';
import {
  getGuitars,
  getIsDataLoaded,
  getTypeFilters,
  getPriceFilters,
  getSortingParams,
  getStringFilters,
  getPurchaseStatus
} from '../../store/selectors';
import { AppRoute, GUITARS_PER_PAGE, PurchaseStatus, SortingOrder, SortingType } from '../../const';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import CatalogSorting from './catalog-sorting/catalog-sorting';
import CatalogFilter from './catalog-filter/catalog-filter';
import ProductList from './products-list/products-list';
import Pagination from './pagination/pagination';
import CartPurchaseModal from '../cart-page/cart-purchase-modal/cart-purchase-modal';
import CartSuccessModal from '../cart-page/cart-success-modal/cart-success-modal';
import { resetGuitars, resetIsDataLoaded } from '../../store/catalog-data/catalog-data';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const startIndex = (Number(id) - 1) * GUITARS_PER_PAGE;
  const endIndex = startIndex + GUITARS_PER_PAGE;
  const guitars = useAppSelector(getGuitars);
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const typeFilters = useAppSelector(getTypeFilters);
  const priceFilters = useAppSelector(getPriceFilters);
  const sortingParams = useAppSelector(getSortingParams);
  const stringCountFilters = useAppSelector(getStringFilters);
  const purchaseStatus = useAppSelector(getPurchaseStatus);

  const { search } = useLocation();

  const searchQuery = createSearchQuery(typeFilters, priceFilters, stringCountFilters, sortingParams);

  const minPriceGuitarSearchQuery = createSearchQuery(
    typeFilters,
    {min: null, max: null},
    stringCountFilters,
    {sortingType: SortingType.Price, sortingOrder: SortingOrder.Asc},
  );

  const maxPriceGuitarSearchQuery = createSearchQuery(
    typeFilters,
    {min: null, max: null},
    stringCountFilters,
    {sortingType: SortingType.Price, sortingOrder: SortingOrder.Desc},
  );

  useEffect(() => {
    dispatch(resetIsDataLoaded());
    dispatch(resetGuitars());
    dispatch(redirectToRoute(`${AppRoute.CatalogPage1}${searchQuery}`));
    dispatch(fetchSortedGuitarsAction(searchQuery));
    dispatch(fetchMinPriceGuitarAction(minPriceGuitarSearchQuery));
    dispatch(fetchMaxPriceGuitarAction(maxPriceGuitarSearchQuery));
  }, [search, dispatch, searchQuery, minPriceGuitarSearchQuery, maxPriceGuitarSearchQuery]);

  const handleEscKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      document.body.style.position = 'static';
      dispatch(endPurchasing());
    }
  };

  return (
    <div className="wrapper" onKeyDown={handleEscKeyDown}>
      <Header isCatalogPage />
      <main className="page-content">
        <div className="container">
          <Breadcrumbs />
          <div className="catalog">
            <CatalogFilter />
            <CatalogSorting />

            {isDataLoaded ?
              <ProductList products={guitars?.slice(startIndex, endIndex)} /> :
              <div style={{display: 'flex', justifyContent: 'center', margin: 'auto', width: '100%'}}>
                <ThreeDots color="#888888" height={80} width={80} />
              </div>}

            <Pagination pageNumber={Number(id)} />
          </div>
        </div>

      </main>
      <Footer />

      {purchaseStatus === PurchaseStatus.Choice ? <CartPurchaseModal /> : ''}
      {purchaseStatus === PurchaseStatus.InCart ? <CartSuccessModal /> : ''}
    </div>
  );
}

export default CatalogPage;

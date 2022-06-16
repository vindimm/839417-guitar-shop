import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchSortedGuitarsAction } from '../../store/api-actions';
import { resetGuitars, resetIsDataLoaded } from '../../store/catalog-data/catalog-data';
import { redirectToRoute } from '../../store/action';
import { createSearchQuery } from '../../utils/utils';
import { getGuitars, getIsDataLoaded, getActiveFilters, getSortingParams } from '../../store/selectors';
import { GUITARS_PER_PAGE} from '../../const';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import CatalogSorting from './catalog-sorting/catalog-sorting';
import CatalogFilter from './catalog-filter/catalog-filter';
import ProductList from './products-list/products-list';
import Pagination from './pagination/pagination';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const startIndex = (Number(id) - 1) * GUITARS_PER_PAGE;
  const endIndex = startIndex + GUITARS_PER_PAGE;
  const guitars = useAppSelector(getGuitars);
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const activeFilters = useAppSelector(getActiveFilters);
  const sortingParams = useAppSelector(getSortingParams);
  const { search } = useLocation();

  const searchQuery = createSearchQuery(activeFilters, sortingParams);

  useEffect(() => {
    dispatch(redirectToRoute(searchQuery));
    dispatch(fetchSortedGuitarsAction(searchQuery));
    return () => {
      dispatch(resetGuitars());
      dispatch(resetIsDataLoaded());
    };
  }, [search, dispatch, searchQuery]);

  return (
    <div className="wrapper">
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
    </div>
  );
}

export default CatalogPage;

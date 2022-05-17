import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { AppRoute, GUITARS_PER_PAGE } from '../../../const';
import { getGuitarsQuantity } from '../../../store/selectors';

type PaginationProps = {
  pageNumber: number;
};

function Pagination({pageNumber}: PaginationProps): JSX.Element {
  const guitarsQuantity = useAppSelector(getGuitarsQuantity);
  const pagesQuantity = Math.floor(guitarsQuantity / GUITARS_PER_PAGE);
  const pages = Array.from({length: pagesQuantity}, () => '');

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {pageNumber > 1 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={AppRoute.CatalogPage.replace(':id', (pageNumber - 1).toString())}
            >
              Назад
            </Link>
          </li>
          : ''}

        {pages.map((_item, index) => {
          const keyValue = `page-${index + 1}`;
          return (
            <li
              className={pageNumber === index + 1 ? 'pagination__page pagination__page--active' : 'pagination__page'}
              key={keyValue}
            >
              <Link
                className="link pagination__page-link"
                to={AppRoute.CatalogPage.replace(':id', (index + 1).toString())}
              >
                {index + 1}
              </Link>
            </li>
          );
        })}

        {pageNumber < pagesQuantity ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link
              className="link pagination__page-link"
              to={AppRoute.CatalogPage.replace(':id', (pageNumber + 1).toString())}
            >
              Далее
            </Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export default Pagination;

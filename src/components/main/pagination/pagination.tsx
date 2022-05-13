import { Link } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { GUITARS_PER_PAGE } from '../../../const';
import { getGuitarsQuantity } from '../../../store/selectors';

type PaginationProps = {
  activePage: number;
  setActivePage: (pageNumber: number) => void;
};

function Pagination({activePage, setActivePage}: PaginationProps): JSX.Element {
  const guitarsQuantity = useAppSelector(getGuitarsQuantity);
  const pagesQuantity = Math.floor(guitarsQuantity / GUITARS_PER_PAGE);
  const pages = Array.from({length: pagesQuantity}, () => '');

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">

        {activePage > 1 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#" onClick={() => setActivePage(activePage - 1)}>
              Назад
            </Link>
          </li>
          : ''}

        {pages.map((_item, index) => {
          const keyValue = `page-${index}`;
          return (
            <li
              className={activePage === index + 1 ? 'pagination__page pagination__page--active' : 'pagination__page'}
              key={keyValue}
            >
              <Link className="link pagination__page-link" to="#" onClick={() => setActivePage(index + 1)}>
                {index + 1}
              </Link>
            </li>
          );
        })}

        {activePage < pagesQuantity ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#" onClick={() => setActivePage(activePage + 1)}>
              Далее
            </Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export default Pagination;

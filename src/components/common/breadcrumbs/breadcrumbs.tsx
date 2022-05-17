import { useLocation, Link } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { getActiveGuitars } from '../../../store/selectors';

function Breadcrumbs(): JSX.Element {
  const location = useLocation();
  const crumbs = location.pathname.split('/');
  const activeGuitars = useAppSelector(getActiveGuitars);

  const parseCrumbs = (item: string) => {
    switch (item) {
      case '':
        item = 'Главная';
        break;
      case 'catalog':
        item = 'Каталог';
        break;
      case 'guitar':
        item = activeGuitars[0]?.name;
        break;
      default:
        item = '';
    }
    return item;
  };

  const parsedCrumbs = crumbs.map(parseCrumbs).filter((item) => item !== '');

  return (
    <>
      <h1 className="page-content__title title title--bigger">{parsedCrumbs[parsedCrumbs.length - 1]}</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        {parsedCrumbs.map((crumb) => (
          <li className="breadcrumbs__item" key={crumb}>
            <Link className="link" to="/">{crumb}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Breadcrumbs;

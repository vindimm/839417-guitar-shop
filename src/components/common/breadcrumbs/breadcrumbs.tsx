import { useParams, useLocation, Link } from 'react-router-dom';

import { useAppSelector } from '../../../hooks';
import { getGuitarById } from '../../../store/selectors';
import { getParsedCrumbs } from '../../../utils/utils';

function Breadcrumbs(): JSX.Element {
  const location = useLocation();
  const crumbs = location.pathname.split('/');
  const { id } = useParams<{id: string}>();
  const guitar = useAppSelector(getGuitarById(Number(id)));
  const parsedCrumbs = getParsedCrumbs(crumbs, guitar?.name);

  return (
    <>
      <h1 className="page-content__title title title--bigger">{parsedCrumbs[parsedCrumbs.length - 1]}</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        {parsedCrumbs.map((crumb, index) => {
          const keyValue = `${crumb}-${index}`;
          return (
            <li className="breadcrumbs__item" key={keyValue}>
              <Link className="link" to="/">{crumb}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Breadcrumbs;

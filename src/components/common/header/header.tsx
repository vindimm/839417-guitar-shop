import { Link } from 'react-router-dom';

import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks';
import { getQuantityGuitarsInCart } from '../../../store/selectors';
import SearchForm from './search-form/search-form';

type HeaderProps = {
  isCatalogPage?: boolean;
}

function Header({ isCatalogPage }: HeaderProps ): JSX.Element {
  const guitarsQuantity = useAppSelector(getQuantityGuitarsInCart);

  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to="/">
          <img className="logo__img" width="70" height="70" src="/img/svg/logo.svg" alt="Логотип"/>
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li>
              <Link
                className={`link main-nav__link ${isCatalogPage ? 'link--current' : ''}`}
                to={AppRoute.Catalog}
              >
              Каталог
              </Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">Где купить?</Link>
            </li>
            <li>
              <Link className="link main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>

        <SearchForm />

        <Link className="header__cart-link" to={AppRoute.CartPage} aria-label="Корзина">
          <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          <span className="visually-hidden">Перейти в корзину</span>
          {guitarsQuantity > 0 ? <span className="header__cart-count">{guitarsQuantity}</span> : ''}
        </Link>
      </div>
    </header>
  );
}

export default Header;

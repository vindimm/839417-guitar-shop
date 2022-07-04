import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';

import { useAppDispatch } from '../../../../hooks';
import { AppRoute } from '../../../../const';
import { Guitar } from '../../../../types/guitar';
import { getPurchasedGuitars } from '../../../../store/selectors';
import { beginPurchasing } from '../../../../store/catalog-cart/catalog-cart';
import ProductInfo from './product-info/product-info';

type ProductCardProps = {
  product: Guitar;
};

function ProductCard({product}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const purchasedGuitars = useAppSelector(getPurchasedGuitars);

  const handleClick = () => {
    dispatch(beginPurchasing(product.id));
    document.body.style.position = 'fixed';
  };

  return (
    <li className="product-card">
      <img
        src={`/${product.previewImg}`}
        srcSet={`/${product.previewImg?.slice(0, -4)}@2x.jpg 2x`}
        width="75"
        height="190"
        alt={product.name}
      />

      <ProductInfo product={product} />

      <div className="product-card__buttons">
        <Link
          className="button button--mini"
          to={AppRoute.GuitarPage.replace(':id', String(product.id))}
        >
          Подробнее
        </Link>
        {product.id in purchasedGuitars ?
          <Link
            className="button button--red-border button--mini button--in-cart"
            to={AppRoute.CartPage}
          >
            В Корзине
          </Link> :
          <Link
            className="button button--red button--mini button--add-to-cart"
            to="#"
            onClick={handleClick}
          >
            Купить
          </Link>}
      </div>
    </li>
  );
}

export default ProductCard;

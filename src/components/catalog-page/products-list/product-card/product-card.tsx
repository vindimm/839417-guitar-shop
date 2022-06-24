import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks';

import { AppRoute } from '../../../../const';
import { Guitar } from '../../../../types/guitar';
import { getPurchasedGuitars } from '../../../../store/selectors';
import ProductInfo from './product-info/product-info';

type ProductCardProps = {
  product: Guitar;
};

function ProductCard({product}: ProductCardProps): JSX.Element {
  const purchasedGuitars = useAppSelector(getPurchasedGuitars);

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
          <Link className="button button--red-border button--mini button--in-cart" to="#">В Корзине</Link> :
          <Link className="button button--red button--mini button--add-to-cart" to="#">Купить</Link>}
      </div>
    </li>
  );
}

export default ProductCard;

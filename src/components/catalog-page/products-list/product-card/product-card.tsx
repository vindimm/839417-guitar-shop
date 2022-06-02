import { Link } from 'react-router-dom';

import { AppRoute } from '../../../../const';
import { Guitar } from '../../../../types/guitar';
import ProductInfo from './product-info/product-info';

type ProductCardProps = {
  product: Guitar;
};

function ProductCard({product}: ProductCardProps): JSX.Element {
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
        <Link className="button button--red-border button--mini button--in-cart" to="#">В Корзине</Link>
      </div>
    </li>
  );
}

export default ProductCard;

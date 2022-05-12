import { Link } from 'react-router-dom';

import { Guitar } from '../../../../types/guitar';

type ProductCardProps = {
  product: Guitar;
};

function ProductCard({product}: ProductCardProps): JSX.Element {
  return (
    <div className="product-card">
      <img
        src={product.previewImg}
        srcSet="img/content/catalog-product-1@2x.jpg 2x"
        width="75"
        height="190"
        alt="Честер Bass"
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>9</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{product.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to="#">Подробнее</Link>
        <Link className="button button--red-border button--mini button--in-cart" to="#">В Корзине</Link>
      </div>
    </div>
  );
}

export default ProductCard;

import { Guitar } from '../../../../../types/guitar';

type ProductInfoProps = {
  product: Guitar;
};

function ProductInfo({product}: ProductInfoProps): JSX.Element {
  return (
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
  );
}

export default ProductInfo;

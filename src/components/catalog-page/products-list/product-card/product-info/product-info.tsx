import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';

import { getReviewsByGuitarId } from '../../../../../store/selectors';
import { fetchReviewsAction } from '../../../../../store/api-actions';
import { Guitar } from '../../../../../types/guitar';
import RatingChart from '../../../../common/rating-chart/rating-chart';

type ProductInfoProps = {
  product: Guitar;
};

function ProductInfo({ product }: ProductInfoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const id = product.id;
  const reviews = useAppSelector(getReviewsByGuitarId(id));

  useEffect(() => {
    if (id) {
      dispatch(fetchReviewsAction(String(id)));
    }
  }, [id, dispatch]);

  return (
    <div className="product-card__info">
      <div className="rate product-card__rate">
        <RatingChart rating={product.rating} size={'small'} />
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>
          {reviews?.length || 0}
        </p>
      </div>
      <p className="product-card__title">{product.name}</p>
      <p className="product-card__price">
        <span className="visually-hidden">Цена:</span>
        {product.price.toLocaleString('ru-RU')} ₽
      </p>
    </div>
  );
}

export default ProductInfo;

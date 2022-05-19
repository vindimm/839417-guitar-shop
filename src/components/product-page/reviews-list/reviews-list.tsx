import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getReviewsByGuitarId } from '../../../store/selectors';
import { fetchReviewsAction } from '../../../store/api-actions';
import { Reviews } from '../../../types/review';
import { REVIEWS_PER_STEP } from '../../../const';
import ReviewItem from './review-item/review-item';

function ReviewsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const reviews: Reviews = useAppSelector(getReviewsByGuitarId(Number(id)));

  const [showedReviews, setShowedReviews] = useState<Reviews>(reviews?.slice(0, REVIEWS_PER_STEP));

  useEffect(() => {
    setShowedReviews(reviews?.slice(0, REVIEWS_PER_STEP));
  }, [reviews]);

  useEffect (() => {
    if (id && !reviews) {
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch, reviews]);

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">
        Отзывы
      </h3>
      <Link className="button button--red-border button--big reviews__sumbit-button" to="#">
        Оставить отзыв
      </Link>

      {showedReviews?.map((review) => <ReviewItem review={review} key={review.id} />)}

      {showedReviews?.length < reviews?.length &&
        <button
          className="button button--medium reviews__more-button"
          onClick={() => setShowedReviews(reviews?.slice(0, showedReviews?.length + REVIEWS_PER_STEP))}
        >
          Показать еще отзывы
        </button>}

      <Link className="button button--up button--red-border button--big reviews__up-button" to="#header">
        Наверх
      </Link>
    </section>
  );
}

export default ReviewsList;

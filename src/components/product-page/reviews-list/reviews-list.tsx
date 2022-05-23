import { useEffect, useState, KeyboardEvent } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getReviewsByGuitarId } from '../../../store/selectors';
import { fetchReviewsAction } from '../../../store/api-actions';
import { Reviews } from '../../../types/review';
import { REVIEWS_PER_STEP } from '../../../const';
import ReviewItem from './review-item/review-item';
import ReviewForm from './review-form/review-form';
import ReviewSuccessModal from './review-success-modal/review-success-modal';

function ReviewsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const reviews: Reviews = useAppSelector(getReviewsByGuitarId(Number(id)));

  const [showedReviews, setShowedReviews] = useState<Reviews>(reviews?.slice(0, REVIEWS_PER_STEP));
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setShowedReviews(reviews?.slice(0, REVIEWS_PER_STEP));
  }, [reviews]);

  useEffect(() => {
    if (id && !reviews) {
      dispatch(fetchReviewsAction(id));
    }
  }, [id, dispatch, reviews]);

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleEscKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeReviewModal();
    }
  };

  return (
    <section className="reviews" onKeyDown={handleEscKeyDown}>
      <h3 className="reviews__title title title--bigger">
        Отзывы
      </h3>
      <Link
        className="button button--red-border button--big reviews__sumbit-button"
        to="#"
        onClick={openReviewModal}
      >
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

      {showedReviews !== undefined &&
        <Link
          to="#"
          className="button button--up button--red-border button--big reviews__up-button"
          style={{ zIndex: '100' }}
          onClick={() => {window.scrollTo(0, 0); }}
        >
        Наверх
        </Link>}

      {isReviewModalOpen && <ReviewForm handleCloseReviewModal={closeReviewModal} handleOpenSuccessModal={openSuccessModal} />}
      {isSuccessModalOpen && <ReviewSuccessModal handleCloseSuccessModal={closeSuccessModal} />}
    </section>
  );
}

export default ReviewsList;

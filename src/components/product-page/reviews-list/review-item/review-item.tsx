import { Review } from '../../../../types/review';
import RatingChart from '../../../common/rating-chart/rating-chart';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({ review }: ReviewItemProps): JSX.Element {
  const date = new Date(review.createAt);
  const formattedDate = date.toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'});

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{review.userName}</h4>
        <span className="review__date">{formattedDate}</span>
      </div>

      <div className="rate review__rating-panel">
        <RatingChart rating={review.rating} size={'large'} />
      </div>

      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{review.advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{review.disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{review.comment}</p>
    </div>
  );
}

export default ReviewItem;

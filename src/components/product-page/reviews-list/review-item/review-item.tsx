import RatingChart from '../../../common/rating-chart/rating-chart';

function ReviewItem(): JSX.Element {
  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
        <span className="review__date">12 декабря</span>
      </div>

      <div className="rate review__rating-panel">
        <RatingChart size={'large'} />
      </div>

      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">Тугие колонки</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня.</p>
    </div>
  );
}

export default ReviewItem;

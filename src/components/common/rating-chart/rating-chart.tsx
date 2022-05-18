import { getMark, getDimensions } from '../../utils';

type RatingChartProps = {
  // ****************
  // Когда появится рейтинг для отзывов
  // сделать rating обязательным параметром
  // *****************
  rating?: number | undefined;
  size: 'small' | 'middle' | 'large';
};

function RatingChart({ rating = 0, size = 'small' }: RatingChartProps): JSX.Element {
  const STARS_QUANTITY = 5;
  const stars = Array.from({length: STARS_QUANTITY}, () => '');
  const roundRating = rating ? Math.round(rating) : 0;
  const [width, height] = getDimensions(size);

  return (
    <>
      {stars.map((_item: string, index: number) => {
        const keyValue = `star-${index}`;
        return (
          <svg width={width} height={height} aria-hidden="true" key={keyValue}>
            <use xlinkHref={(index + 1) <= roundRating ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        );
      })}
      <p className="visually-hidden">Оценка: {getMark(roundRating)}</p>
    </>
  );
}

export default RatingChart;
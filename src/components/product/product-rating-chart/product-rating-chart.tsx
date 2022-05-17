function RatingChart(): JSX.Element {
  return (
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
  );
}

export default RatingChart;

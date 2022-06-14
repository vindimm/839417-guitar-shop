import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitarById, getReviewsByGuitarId, getIsDataLoaded } from '../../store/selectors';
import { fetchGuitarAction } from '../../store/api-actions';
import { resetGuitars, resetIsDataLoaded } from '../../store/catalog-data/catalog-data';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import ReviewsList from './reviews-list/reviews-list';
import RatingChart from '../common/rating-chart/rating-chart';
import ProductTabs from './product-tabs/product-tabs';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const guitar = useAppSelector(getGuitarById(Number(id)));
  const reviews = useAppSelector(getReviewsByGuitarId(Number(id)));
  const isDataLoaded = useAppSelector(getIsDataLoaded);

  useEffect (() => {
    if (id && !guitar) {
      dispatch(fetchGuitarAction(id));
    }
  }, [id, dispatch, guitar]);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      dispatch(resetGuitars());
      dispatch(resetIsDataLoaded());
    };
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">

        {isDataLoaded ?(
          <div className="container">
            <Breadcrumbs />
            <div className="product-container">
              <img className="product-container__img"
                src={`/${guitar?.previewImg.replace('.jpg', '.png')}`}
                srcSet="/img/content/catalog-product-2@2x.png 2x"
                width="90"
                height="235"
                alt={guitar?.name}
              />
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{guitar?.name}</h2>
                <div className="rate product-container__rating">
                  <RatingChart rating={guitar?.rating} size={'middle'} />
                  <p className="rate__count" style={{paddingLeft: '8px'}}>
                    <span className="visually-hidden">Всего оценок:</span>
                    {reviews?.length || 0}
                  </p>
                </div>
                <ProductTabs guitar={guitar} />
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                <p className="product-container__price-info product-container__price-info--value">
                  {guitar?.price.toLocaleString('ru-RU')} ₽
                </p>
                <a className="button button--red button--big product-container__button" href="#">
                  Добавить в корзину
                </a>
              </div>
            </div>
            <ReviewsList />
          </div>
        ) : (
          <div className="container" style={{marginTop: 100, display: 'flex', justifyContent: 'center'}}>
            <ThreeDots color="#444444" height={80} width={80} ariaLabel='loading'/>
          </div>)}

      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;

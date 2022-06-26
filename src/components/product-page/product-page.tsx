import { useEffect, KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitarById, getReviewsByGuitarId, getIsDataLoaded, getPurchaseStatus } from '../../store/selectors';
import { fetchGuitarAction } from '../../store/api-actions';
import { PurchaseStatus } from '../../const';
import { resetGuitars, resetIsDataLoaded } from '../../store/catalog-data/catalog-data';
import { beginPurchasing, endPurchasing } from '../../store/catalog-cart/catalog-cart';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import ReviewsList from './reviews-list/reviews-list';
import RatingChart from '../common/rating-chart/rating-chart';
import ProductTabs from './product-tabs/product-tabs';
import CartPurchaseModal from '../cart-page/cart-purchase-modal/cart-purchase-modal';
import CartSuccessModal from '../cart-page/cart-success-modal/cart-success-modal';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const guitar = useAppSelector(getGuitarById(Number(id)));
  const reviews = useAppSelector(getReviewsByGuitarId(Number(id)));
  const isDataLoaded = useAppSelector(getIsDataLoaded);
  const purchaseStatus = useAppSelector(getPurchaseStatus);

  useEffect (() => {
    if (id && !guitar) {
      dispatch(fetchGuitarAction(id));
    }
  }, [id, dispatch, guitar]);

  useEffect(() => () => {
    dispatch(resetGuitars());
    dispatch(resetIsDataLoaded());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    dispatch(beginPurchasing(Number(id)));
    document.body.style.position = 'fixed';
  };

  const handleEscKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      document.body.style.position = 'static';
      dispatch(endPurchasing());
    }
  };

  return (
    <div className="wrapper" onKeyDown={handleEscKeyDown}>
      <Header />
      <main className="page-content">

        {isDataLoaded ? (
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
                <h2
                  className="product-container__title title title--big title--uppercase"
                  data-testid="guitar-title-test"
                >
                  {guitar?.name}
                </h2>
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
                <Link
                  className="button button--red button--big product-container__button"
                  to="#"
                  onClick={handleClick}
                >
                  Добавить в корзину
                </Link>
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

      {purchaseStatus === PurchaseStatus.Choice && guitar ? <CartPurchaseModal /> : ''}
      {purchaseStatus === PurchaseStatus.InCart ? <CartSuccessModal /> : ''}
    </div>
  );
}

export default ProductPage;

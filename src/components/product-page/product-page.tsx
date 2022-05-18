import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitarById } from '../../store/selectors';
import { fetchGuitarAction } from '../../store/api-actions';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import ReviewsList from './reviews-list/reviews-list';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const guitar = useAppSelector(getGuitarById(Number(id)));

  useEffect (() => {
    if (id) {
      dispatch(fetchGuitarAction(id));
    }
  }, [id, dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
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
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: Хорошо</p>
              </div>
              <div className="tabs">
                <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
                <a className="button button--black-border button--medium tabs__button" href="#description">
                  Описание
                </a>
                <div className="tabs__content" id="characteristics">
                  <table className="tabs__table">
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{guitar?.vendorCode}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{guitar?.type}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">{guitar?.stringCount} струнная</td>
                    </tr>
                  </table>
                  <p className="tabs__product-description hidden">
                    Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.
                  </p>
                </div>
              </div>
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
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;

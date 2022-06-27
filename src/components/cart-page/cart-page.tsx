import { KeyboardEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { PurchaseStatus } from '../../const';
import { getTotalCostInCart, getPurchaseStatus } from '../../store/selectors';
import { endPurchasing } from '../../store/catalog-cart/catalog-cart';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import Breadcrumbs from '../common/breadcrumbs/breadcrumbs';
import CartList from './cart-list/cart-list';
import CartDeleteModal from './cart-delete-modal/cart-delete-modal';

function CartPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const totalCost = useAppSelector(getTotalCostInCart);
  const purchaseStatus = useAppSelector(getPurchaseStatus);

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
        <div className="container">
          <Breadcrumbs />
          <div className="cart">

            <CartList />

            <div className="cart__footer">
              <div className="cart__coupon coupon">
                <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                <form className="coupon__form" id="coupon-form" method="post" action="/">
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                    <p className="form-input__message form-input__message--success">Промокод принят</p>
                  </div>
                  <button className="button button--big coupon__button">Применить</button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{totalCost.toLocaleString('ru-RU')} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  <span className="cart__total-value cart__total-value--bonus">- xxxx ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">xx xxx ₽</span>
                </p>
                <button className="button button--red button--big cart__order-button">Оформить заказ</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {purchaseStatus === PurchaseStatus.Deleting ? <CartDeleteModal /> : ''}
    </div>
  );
}

export default CartPage;

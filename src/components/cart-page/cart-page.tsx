import { useState, KeyboardEvent, FormEvent, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';

import { sendCouponAction } from '../../store/api-actions';
import { PromoCodeStatus, PurchaseStatus } from '../../const';
import { getTotalCostInCart, getPurchaseStatus, getDiscountPercent, getPromoCodeStatus } from '../../store/selectors';
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
  const promoCodeStatus = useAppSelector(getPromoCodeStatus);
  const discountPercent = useAppSelector(getDiscountPercent);
  const discountSum = totalCost * discountPercent / 100;

  const [promoCode, setPromoCode] = useState('');

  const handleEscKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      document.body.style.position = 'static';
      dispatch(endPurchasing());
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendCouponAction(promoCode));
  };

  const handleChangePromoCode = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(evt.target.value.replace(/\s/g, ''));
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
                <form
                  className="coupon__form"
                  id="coupon-form"
                  method="post"
                  action="/"
                  onSubmit={handleSubmit}
                >
                  <div className="form-input coupon__input">
                    <label className="visually-hidden">Промокод</label>
                    <input
                      type="text"
                      placeholder="Введите промокод"
                      id="coupon"
                      name="coupon"
                      value={promoCode}
                      onChange={handleChangePromoCode}
                    />

                    {promoCodeStatus === PromoCodeStatus.Ok &&
                    <p className="form-input__message form-input__message--success">Промокод принят</p>}

                    {promoCodeStatus === PromoCodeStatus.Error &&
                    <p className ="form-input__message form-input__message--error">неверный промокод</p>}

                  </div>
                  <button className="button button--big coupon__button">
                    Применить
                  </button>
                </form>
              </div>
              <div className="cart__total-info">
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Всего:</span>
                  <span className="cart__total-value">{totalCost.toLocaleString('ru-RU')} ₽</span>
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">Скидка:</span>
                  {
                    discountSum ?

                      <span className="cart__total-value cart__total-value--bonus">
                      - {discountSum.toLocaleString('ru-RU')} ₽
                      </span> :

                      <span className="cart__total-value">
                        {discountSum.toLocaleString('ru-RU')} ₽
                      </span>
                  }
                </p>
                <p className="cart__total-item">
                  <span className="cart__total-value-name">К оплате:</span>
                  <span className="cart__total-value cart__total-value--payment">
                    {(totalCost - discountSum).toLocaleString('ru-RU')} ₽
                  </span>
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

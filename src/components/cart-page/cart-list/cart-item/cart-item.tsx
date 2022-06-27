import { ChangeEvent, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { getGuitarById } from '../../../../store/selectors';
import { GuitarsCountInCart } from '../../../../const';
import { getGuitarType } from '../../../../utils/utils';
import {
  beginDeleting,
  decreaseGuitarsCount,
  increaseGuitarsCount,
  updateGuitarsCount
} from '../../../../store/catalog-cart/catalog-cart';

type CartItemProps = {
  id: number;
  quantity: number;
};

function CartItem({id, quantity}: CartItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(getGuitarById(Number(id)));

  const [guitarsCount, setGuitarsCount] = useState(quantity);

  const handleChangeGuitarsCount = (evt: ChangeEvent<HTMLInputElement>) => {
    setGuitarsCount(Number(evt.target.value));
    dispatch(updateGuitarsCount({id, quantity: Number(evt.target.value)}));
    if (Number(evt.target.value) === 0) {
      dispatch(beginDeleting(id));
    }
  };

  const handleReduceGuitarsCount = () => {
    if (guitarsCount === 1) {
      dispatch(beginDeleting(id));
    }
    if (guitarsCount > GuitarsCountInCart.Minimal) {
      setGuitarsCount(guitarsCount - 1);
      dispatch(decreaseGuitarsCount(id));
    }
  };

  const handleIncreaseGuitarsCount = () => {
    if (guitarsCount < GuitarsCountInCart.Maximal) {
      setGuitarsCount(guitarsCount + 1);
      dispatch(increaseGuitarsCount(id));
    }
  };

  const handleDeleteItem = () => {
    dispatch(beginDeleting(id));
  };

  return (
    <div className="cart-item">
      <button
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteItem}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={`/${guitar?.previewImg.replace('.jpg', '.png')}`}
          srcSet="img/content/catalog-product-2@2x.jpg 2x"
          width="55"
          height="130"
          alt={guitar?.name}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{guitar?.name}</p>
        <p className="product-info__info">Артикул: {guitar?.vendorCode}</p>
        <p className="product-info__info">{getGuitarType(guitar?.type)}, {guitar?.stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{guitar?.price.toLocaleString('ru-RU')} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          onClick={handleReduceGuitarsCount}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          max="99"
          value={guitarsCount}
          onChange={handleChangeGuitarsCount}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          onClick={handleIncreaseGuitarsCount}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">
        {guitar?.price ? (guitar.price * quantity).toLocaleString('ru-RU') : ''} ₽
      </div>
    </div>
  );
}

export default CartItem;

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

  const [guitarsCount, setGuitarsCount] = useState<number>(quantity);

  const handleChangeGuitarsCount = (evt: ChangeEvent<HTMLInputElement>) => {
    setGuitarsCount(Number(evt.currentTarget.value.slice(0, 2)));
    dispatch(updateGuitarsCount({id, quantity: Number(evt.target.value.slice(0, 2))}));
  };

  const handleBlurGuitarsCount = (evt: ChangeEvent<HTMLInputElement>) => {
    setGuitarsCount(Number(evt.target.value));
    dispatch(updateGuitarsCount({id, quantity: Number(evt.target.value)}));
    if (Number(evt.target.value) === 0) {
      setGuitarsCount(1);
      dispatch(updateGuitarsCount({id, quantity: 1}));
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
    <div className="cart-item" data-testid="cart-item-testid">
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
          srcSet={`/${guitar?.previewImg.slice(0, -4)}@2x.jpg`}
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
          data-testid="guitar-count-input-testid"
          className="quantity__input"
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          min="1"
          max="99"
          value={String(guitarsCount)}
          onChange={handleChangeGuitarsCount}
          onBlur={handleBlurGuitarsCount}
        />
        <button
          data-testid="plus-button-testid"
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

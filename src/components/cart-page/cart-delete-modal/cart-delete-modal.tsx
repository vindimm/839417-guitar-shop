import { KeyboardEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { endPurchasing, removePurchasedGuitar } from '../../../store/catalog-cart/catalog-cart';
import { getGuitarById, getPurchasingGuitarId } from '../../../store/selectors';
import { getGuitarType } from '../../../utils/utils';

function CartDeleteModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const id = useAppSelector(getPurchasingGuitarId);
  const guitar = useAppSelector(getGuitarById(id));

  const handleCloseModal = () => {
    dispatch(endPurchasing());
    document.body.style.position = 'static';
  };

  const handleEscKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      dispatch(endPurchasing());
      document.body.style.position = 'static';
    }
  };

  const handleDeleteGuitar = () => {
    dispatch(removePurchasedGuitar(id));
    dispatch(endPurchasing());
  };

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleCloseModal}
        >
        </div>
        <div className="modal__content" onKeyPress={handleEscKeyDown}>
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <div className="modal__info">
            <img
              className="modal__img"
              src={`/${guitar?.previewImg.replace('.jpg', '.png')}`}
              srcSet="img/content/catalog-product-2@2x.png 2x"
              width="67"
              height="137"
              alt={guitar?.name}
            />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">
                Гитара {guitar?.name}
              </h3>
              <p className="modal__product-params modal__product-params--margin-11">
                Артикул: {guitar?.vendorCode}
              </p>
              <p className="modal__product-params">{getGuitarType(guitar?.type)}, {guitar?.stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{guitar?.price.toLocaleString('ru-RU')} ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button
              className="button button--small modal__button"
              onClick={handleDeleteGuitar}
            >
              Удалить товар
            </button>
            <button
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={handleCloseModal}
            >
              Продолжить покупки
            </button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseModal}
          >
            <span className="button-cross__icon"></span>
            <span
              className="modal__close-btn-interactive-area"
            >
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDeleteModal;

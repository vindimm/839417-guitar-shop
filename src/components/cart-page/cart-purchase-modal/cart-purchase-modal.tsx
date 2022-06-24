import { useAppDispatch } from '../../../hooks';
import { endPurchasing } from '../../../store/catalog-cart/catalog-cart';
import { Guitar } from '../../../types/guitar';
import { getGuitarType } from '../../../utils/utils';

type CartPurchaseModalProps = {
  guitar: Guitar;
};

function CartPurchaseModal({guitar}: CartPurchaseModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCloseButtonClick = () => {
    dispatch(endPurchasing());
  };

  return (
    <div className="modal is-active modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal></div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
          <div className="modal__info">
            <img
              className="modal__img"
              src={`/${guitar?.previewImg.replace('.jpg', '.png')}`}
              srcSet="img/content/catalog-product-2@2x.png 2x"
              width="67" height="137"
              alt="Честер bass"
            />
            <div className="modal__info-wrapper">
              <h3 className="modal__product-name title title--little title--uppercase">Гитара {guitar.name}</h3>
              <p className="modal__product-params modal__product-params--margin-11">Артикул: {guitar.vendorCode}</p>
              <p className="modal__product-params">{getGuitarType(guitar.type)}, {guitar.stringCount} струнная</p>
              <p className="modal__price-wrapper">
                <span className="modal__price">Цена:</span>
                <span className="modal__price">{guitar?.price.toLocaleString('ru-RU')} ₽</span>
              </p>
            </div>
          </div>
          <div className="modal__button-container">
            <button className="button button--red button--big modal__button modal__button--add">Добавить в корзину</button>
          </div>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={handleCloseButtonClick}
          >
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPurchaseModal;

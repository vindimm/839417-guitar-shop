import { PurchasedGuitars } from '../../../types/cart';
import { useAppSelector } from '../../../hooks';
import { getPurchasedGuitars } from '../../../store/selectors';
import CartItem from './cart-item/cart-item';

function CartList(): JSX.Element {
  const purchasedGuitars: PurchasedGuitars = useAppSelector(getPurchasedGuitars);

  if (Object.keys(purchasedGuitars).length === 0) {
    return (
      <div style={{width: '100%', padding: '64px 0px', textAlign: 'center'}}>
        <h2 style={{margin: '0 auto', color: '#C90606'}}>В корзине сейчас нет товаров.</h2>
      </div>
    );
  }

  return (
    <>
      {Object.keys(purchasedGuitars).map((id) => (
        <CartItem
          id={Number(id)}
          quantity={purchasedGuitars[Number(id)]}
          key={Number(id)}
        />))}
    </>
  );
}

export default CartList;

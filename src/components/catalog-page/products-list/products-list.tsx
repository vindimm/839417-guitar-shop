import { Guitars } from '../../../types/guitar';
import ProductCard from './product-card/product-card';

type ProductListProps = {
  products: Guitars;
};

function ProductsList({products}: ProductListProps): JSX.Element {
  if (products.length === 0) {
    return (
      <div style={{width: '100%', paddingTop: '100px', textAlign: 'center'}}>
        <h2 style={{margin: '0 auto'}}>К сожалению таких гитар нет.</h2>
        <p>Попробуйте сменить или сбросить фильтры.</p>
      </div>
    );
  }
  return (
    <ul className="cards catalog__cards" style={{paddingLeft: '0'}}>
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </ul>
  );
}

export default ProductsList;

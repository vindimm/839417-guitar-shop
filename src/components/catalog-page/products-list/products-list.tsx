import { Guitars } from '../../../types/guitar';
import ProductCard from './product-card/product-card';

type ProductListProps = {
  products: Guitars;
};

function ProductsList({products}: ProductListProps): JSX.Element {
  return (
    <ul className="cards catalog__cards">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </ul>
  );
}

export default ProductsList;

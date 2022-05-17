import { Guitars } from '../../../types/guitar';
import ProductCard from './product-card/product-card';

type ProductListProps = {
  products: Guitars;
};

function ProductsList({products}: ProductListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
}

export default ProductsList;

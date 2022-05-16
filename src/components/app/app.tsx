import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';
import Product from '../product/product';

function App(): JSX.Element {
  return (
    <BrowserRouter >
      <Routes>
        <Route index element={<Catalog />} />
        <Route path={AppRoute.Catalog} element={<Catalog />} />
        <Route path={AppRoute.Product} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

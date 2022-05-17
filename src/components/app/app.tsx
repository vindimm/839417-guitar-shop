import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';
import Product from '../product/product';

function App(): JSX.Element {
  return (
    <BrowserRouter >
      <Routes>
        <Route index element={<Navigate to={AppRoute.Catalog} />} />
        <Route path={AppRoute.Catalog} >
          <Route index element={<Navigate to={AppRoute.CatalogPage1} />} />
          <Route path="page/:id" element={<Catalog />} />
          <Route path="guitar/:id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

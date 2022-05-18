import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import ProductPage from '../product-page/product-page';

function App(): JSX.Element {
  return (
    <BrowserRouter >
      <Routes>
        <Route index element={<Navigate to={AppRoute.Catalog} />} />
        <Route path={AppRoute.Catalog} >
          <Route index element={<Navigate to={AppRoute.CatalogPage1} />} />
          <Route path="page/:id" element={<CatalogPage />} />
          <Route path="guitar/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

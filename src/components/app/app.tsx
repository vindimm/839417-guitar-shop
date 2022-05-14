import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { AppRoute } from '../../const';
import Catalog from '../catalog/catalog';

function App(): JSX.Element {
  return (
    <BrowserRouter >
      <Routes>
        <Route index element={<Catalog />} />
        <Route path={AppRoute.Catalog} element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

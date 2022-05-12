import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Main from '../main/main';

function App(): JSX.Element {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

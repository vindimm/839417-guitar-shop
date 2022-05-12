import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import { store } from './store';
import { fetchGuitarsAction } from './store/api-actions';

store.dispatch(fetchGuitarsAction());

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));

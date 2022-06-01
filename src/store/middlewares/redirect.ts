import { Middleware } from 'redux';

import browserHistory from '../../browser-history';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === 'redirectToRoute') {
          browserHistory.push(action.payload);
          // eslint-disable-next-line no-console
          console.log(121231231231);
        }

        return next(action);
      };

import { createAction } from '@reduxjs/toolkit';

import { Guitar, Guitars } from '../types/guitar';

export const loadGuitars = createAction<Guitars>('data/loadGuitars');

export const loadSeveralGuitars = createAction<Guitars>('data/loadSeveralGuitars');

export const loadGuitar = createAction<Guitar>('data/loadGuitar');

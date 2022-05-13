import { createAction } from '@reduxjs/toolkit';

import { Guitars } from '../types/guitar';

export const loadGuitars = createAction<Guitars>('data/loadGuitars');

export const loadSeveralGuitars = createAction<Guitars>('data/loadSeveralGuitars');

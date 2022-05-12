import { createAction } from '@reduxjs/toolkit';

import { Guitars } from '../types/guitar';

export const loadGuitars = createAction<Guitars>('data/loadGuitars');

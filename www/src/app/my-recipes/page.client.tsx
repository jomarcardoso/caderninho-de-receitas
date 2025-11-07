'use client';

import { withData } from '@/providers/data/data.hoc';
import { MyRecipesView } from './page.view';

export const MyRecipesClient = withData(MyRecipesView);

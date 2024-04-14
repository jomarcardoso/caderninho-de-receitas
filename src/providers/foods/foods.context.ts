import { createContext } from 'react';
import { Food } from '../../services/food';

export const FoodsContext = createContext<Array<Food>>([]);

import { createContext } from 'react';
import { Food } from '../../services/food';

const FoodsContext = createContext<Array<Food>>([]);

export default FoodsContext;

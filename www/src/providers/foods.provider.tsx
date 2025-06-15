import React, {
  createContext,
  FC,
  HTMLProps,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Food } from '../services/food';
import { fetchFood } from '../services/food/food.service';
import LoadingContext from './loading/loading.context';

export const FoodsContext = createContext<{
  foods: Food[];
  setFoods?: React.Dispatch<React.SetStateAction<Food[]>>;
}>({ foods: [] });

export const FoodsProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const memoizedFoods = useMemo(() => ({ foods, setFoods }), [foods]);
  const { setLoading } = useContext(LoadingContext);

  const fetch = async () => {
    try {
      const dataFoods = await fetchFood();

      setFoods(dataFoods);
      setLoading?.(false);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading?.(true);
    fetch();
  }, []);

  return (
    <FoodsContext.Provider value={memoizedFoods}>
      {children}
    </FoodsContext.Provider>
  );
};

import { type FC, type HTMLProps } from 'react';
import { DataContext } from './data.context';
import { useData } from './data.hook';

export const DataProvider: FC<HTMLProps<HTMLDivElement>> = ({ children }) => {
  const { data, removeRecipe, saveRecipe } = useData();

  return (
    <DataContext.Provider value={{ data, removeRecipe, saveRecipe }}>
      {children}
    </DataContext.Provider>
  );
};

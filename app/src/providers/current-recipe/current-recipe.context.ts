import { createContext } from 'react';

export interface CurrentRecipeContextProps {
  currentRecipeId?: number;
  setCurrentRecipeId?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  restoreLastRecipe?: () => void;
}

const CurrentRecipeContext = createContext<CurrentRecipeContextProps>({});

export default CurrentRecipeContext;


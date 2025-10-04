import { createContext } from 'react';

export const EditingContext = createContext<{
  editing: boolean;
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}>({ editing: false });
